import { sendEmail } from './mailtrap/nodemailer.config.js';

const testEmail = async () => {
  try {
    console.log('Testing email sending...');
    await sendEmail('Sulaimanalfarsi26@gmail.com', 'Test Email from Password Manager', '<h1>Test Email</h1><p>This is a test email to verify Nodemailer is working correctly!</p>');
    console.log('✅ Test email sent successfully!');
  } catch (error) {
    console.error('❌ Test email failed:', error);
  }
};

testEmail();
