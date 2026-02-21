import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const envPath = process.env.DOTENV_PATH || '.env.server';
dotenv.config({ path: envPath });
dotenv.config();

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

const mailTo = process.env.MAIL_TO || 'christinewx3@outlook.com';
const mailFrom = process.env.MAIL_FROM || 'christinewx2@outlook.com';
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, institution, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' });
  }
  if (!mailFrom || !smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({ ok: false, error: 'Email service is not configured.' });
  }

  const subject = 'Qiya Website Demo Request';
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Institution: ${institution || 'N/A'}`,
    `Message: ${message}`,
  ].join('\n');

  try {
    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject,
      text,
    });
    
    // Log preview URL for Ethereal Email
    if (smtpHost === 'smtp.ethereal.email') {
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }
    
    return res.json({ ok: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ ok: false, error: 'Failed to send email.' });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.log(`Email service listening on :${port}`);
});
