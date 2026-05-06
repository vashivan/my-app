import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `👋 Привіт!

chat_id:
<code>${chatId}</code>

Скопіюй його та встав в .env.`,
    {
      parse_mode: 'HTML',
    }
  );
});

console.log('🤖 Telegram bot started');