## Lead Form Integration — MODX + SalesDrive + Діловод + Telegram

Frontend/backend integration project for processing leads from a landing page form with CRM integrations, validation, and Telegram notifications.

## 🚀 Features
Lead form with:
First name
Last name
Email
Phone
Message
Client-side and server-side validation
Honeypot anti-spam protection
SalesDrive CRM integration
Діловод integration
Telegram notifications for server/API errors
Telegram chat ID helper script
Responsive frontend
Logging support

## 🛠 Tech Stack
Frontend
React
TypeScript
SCSS
Vite
Backend
Node.js
Express.js
Integrations
SalesDrive API
Діловод API
Telegram Bot API

## ⚙️ Installation
1. Clone repository
git clone https://github.com/your-username/project-name.git
2. Install dependencies
npm install
3. Create .env
PORT=5000

SALESDRIVE_API_KEY=
SALESDRIVE_URL=

DILOVOD_API_KEY=
DILOVOD_URL=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

## 🤖 Telegram Bot Setup
1. Open Telegram Bot

Open Telegram and find bot @error123testbot

2. Run Telegram helper script

Start the helper script:

node telegram.js

Then tap /start your Telegram bot.

Bot will return your chatID.

Example:

Chat ID: 123456789

3. Add chat ID to .env
TELEGRAM_CHAT_ID=123456789

## ▶️ Running the Project
Frontend
npm run dev

Runs the Vite frontend application.

Backend Server
node server.js

Starts the Express backend server.

Telegram Chat ID Helper
node telegram.js

Returns Telegram chat_id for notifications.

## 📨 API Endpoint
POST /api/lead
Request Body
{
  "fName": "Ivan",
  "lName": "Vashchuk",
  "phone": "+380000000000",
  "email": "test@example.com",
  "message": "Hello",
  "website": ""
}
✅ Validation

The backend validates:

Name format
Phone format
Email format
Empty required fields
Honeypot spam field

Example:

if (website) {
  return res.status(400).json({
    error: 'Spam detected'
  });
}

## 🔗 SalesDrive Integration

Lead data is automatically sent to SalesDrive CRM.

Example:

await sendToSalesDrive({
  fName,
  lName,
  phone,
  email,
  message,
});

## 📦 Діловод Integration

Validated leads are also sent to Діловод.

await sendToDilovod(lead);
❌ Telegram Error Notifications

If any API request fails, the system sends a Telegram notification.

Example:

❌ SalesDrive Error

Lead:
Ivan Vashchuk
+380000000000

Error:
401 Unauthorized
🛡 Spam Protection

Implemented using:

Honeypot field
Regex validation
Server-side checks
📱 Responsive Frontend

Optimized for:

Mobile
Tablet
Desktop
📌 Future Improvements
Database integration
Retry queue
Email notifications
Admin dashboard
CAPTCHA
File uploads

## 👨‍💻 Author

Ivan Vashchuk

Frontend Developer / Product Builder

React
Next.js
TypeScript
CRM/API Integrations
UI/UX Systems