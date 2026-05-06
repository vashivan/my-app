import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use(
  '/api/lead',
  rateLimit({
    windowMs: 60 * 1000,
    max: 5,
  }),
);

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]{2,}$/;
const phoneRegex = /^\+380\d{9}$/;

const sendTelegramAlert = async (message) => {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    return;
  }

  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML"
    },
  );
};

const sendToSalesDrive = async (lead) => {
  const url = `https://qawsed.salesdrive.me/handler/`;

  return axios.post(
    url,
    {
      form: 'Website form',
      fName: lead.fName,
      lName: lead.lName,
      phone: lead.phone,
      email: lead.email,
      con_comment: lead.message,
    },
    {
      headers: {
        'X-Api-Key': process.env.SALES_DRIVE_API_KEY,
      },
      timeout: 10000,
    },
  );
};

const sendToDilovod = async (lead) => {
  const details = {
    phones: [
      {
        pr: lead.phone,
        kind: "phone"
      }
    ],
    emails: [
      {
        pr: lead.email,
        kind: "email"
      },
    ],
    messengers: [],
    urls: [],
    attributes: [],
    note: [{ value: lead.message || '' }],
  };

  const packet = {
    version: '0.25',
    key: process.env.DILOVOD_API_KEY,
    action: 'saveObject',
    params: {
      header: {
        id: 'catalogs.persons',
        name: { uk: lead.name },
        parent: 1100100000001032,
        personType: 1004000000000035,
        code: `WEB-${Date.now()}`,
        state: 0,
        phone: lead.phone,
        email: lead.email,
        remark: lead.message || '',
        details: JSON.stringify(details),
      },
    },
  };

  const res = await axios.post(
    'https://api.dilovod.ua',
    new URLSearchParams({
      packet: JSON.stringify(packet),
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 10000,
    },
  );

  console.log('📦 Dilovod RAW:', res.data);
  return res;
};

app.post('/api/lead', async (req, res) => {
  const { fName, lName, phone, email, message, website } = req.body;

  console.log('🔥 HIT API');
  console.log('📥 BODY:', req.body);

  if (website) {
    return res.status(400).json({ error: 'Spam detected' });
  }

  if (!nameRegex.test(fName)) {
    return res.status(400).json({ error: 'Name invalid' });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Phone invalid' });
  }

  const lead = {
    name: `${fName} ${lName}`,
    phone,
    email,
    message,
  };

  try {
    //SalesDrive
    const salesRes = await sendToSalesDrive({
      fName,
      lName,
      phone,
      email,
      message,
    });

    console.log('✅ SalesDrive:', salesRes.data);

    //Dilovod
    const dilovodRes = await sendToDilovod(lead);

    console.log('📦 Dilovod:', dilovodRes.data);

    return res.json({ success: true });

  } catch (err) {
    console.error('❌ ERROR:', err?.response?.data || err.message);

    await sendTelegramAlert(`
      🚨 <b>Integration failed</b>

      👤 Lead: ${lead.name}
      📞 Phone: ${lead.phone}
      📧 Email: ${lead.email || 'No email'}
      💬 Message: ${lead.message || 'No message'}
   `);

    return res.status(500).json({
      error: 'Integration failed',
    });
  }
});

app.listen(3001, () => {
  console.log(`Server started on port ${3001}`);
});