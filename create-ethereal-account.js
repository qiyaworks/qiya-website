import nodemailer from 'nodemailer';

async function createAccount() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('\n=== Ethereal Email Test Account Created ===\n');
    console.log('SMTP_HOST=' + testAccount.smtp.host);
    console.log('SMTP_PORT=' + testAccount.smtp.port);
    console.log('SMTP_USER=' + testAccount.user);
    console.log('SMTP_PASS=' + testAccount.pass);
    console.log('MAIL_FROM=' + testAccount.user);
    console.log('\nPreview URL: https://ethereal.email');
    console.log('\nLogin with the credentials above to view sent emails.\n');
  } catch (error) {
    console.error('Error creating test account:', error);
  }
}

createAccount();
