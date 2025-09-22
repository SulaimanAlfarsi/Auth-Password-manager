export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Password Manager</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <div style="background-color: rgba(255, 255, 255, 0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
                🔐
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Welcome to Password Manager!
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px; font-weight: 400;">
                Your secure password management solution
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1e293b; margin: 0 0 15px; font-size: 24px; font-weight: 600;">
                  Hello {name}! 👋
                </h2>
                <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6;">
                  Your account has been successfully verified and you're all set to start managing your passwords securely.
                </p>
              </div>
              
              <!-- Features Grid -->
              <div style="margin: 30px 0;">
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 30px;">
                  <div style="flex: 1; min-width: 250px; background-color: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 10px;">🛡️</div>
                    <h3 style="color: #1e293b; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Secure Storage</h3>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Store your passwords with military-grade encryption</p>
                  </div>
                  <div style="flex: 1; min-width: 250px; background-color: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 10px;">🔑</div>
                    <h3 style="color: #1e293b; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Generate Passwords</h3>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Create strong, unique passwords instantly</p>
                  </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                  <div style="flex: 1; min-width: 250px; background-color: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 10px;">🌐</div>
                    <h3 style="color: #1e293b; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Access Anywhere</h3>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Sync across all your devices seamlessly</p>
                  </div>
                  <div style="flex: 1; min-width: 250px; background-color: #f1f5f9; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 10px;">🔒</div>
                    <h3 style="color: #1e293b; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Zero-Knowledge</h3>
                    <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">We can't see your passwords, only you can</p>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                  Get Started Now →
                </a>
              </div>
              
              <!-- Security Note -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <div style="display: flex; align-items: flex-start;">
                  <div style="font-size: 20px; margin-right: 12px; margin-top: 2px;">⚠️</div>
                  <div>
                    <h4 style="color: #92400e; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Security Reminder</h4>
                    <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                      Never share your master password with anyone. We recommend using a strong, unique password that you haven't used elsewhere.
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Footer Message -->
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; margin: 0 0 10px; font-size: 16px; line-height: 1.6;">
                  Thank you for choosing <strong style="color: #1e293b;">Password Manager</strong> for your security needs!
                </p>
                <p style="color: #64748b; margin: 0; font-size: 14px;">
                  Best regards,<br>
                  <strong style="color: #1e293b;">The Password Manager Team</strong>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Bottom Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px; line-height: 1.5;">
                This is an automated message. Please do not reply to this email.<br>
                If you have any questions, please contact our support team.
              </p>
              <div style="margin-top: 15px;">
                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy Policy</a>
                <span style="color: #cbd5e1;">|</span>
                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Terms of Service</a>
                <span style="color: #cbd5e1;">|</span>
                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Support</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;