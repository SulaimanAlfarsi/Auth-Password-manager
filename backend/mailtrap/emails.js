import { mailtrapClient , sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Please verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Verification email sent:", response);

    } catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error(`Failed to send verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Password Manager!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Welcome Email"
        });
        
        console.log("Welcome email sent:", response);
    } catch (error) {
        console.error(`Error sending welcome email: ${error}`);
        throw new Error(`Failed to send welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        console.log("Preparing password reset email...");
        console.log("Email:", email);
        console.log("Reset URL:", resetURL);
        
        const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
        console.log("HTML content prepared");
        
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Request",
            html: htmlContent,
            category: "Password Reset"
        });
        
        console.log("Password reset email sent successfully:", response);
        return response;
    } catch (error) {
        console.error(`Error sending password reset email: ${error}`);
        console.error("Error details:", error.message);
        throw new Error(`Failed to send password reset email: ${error.message}`);
    }
}

export const sendRestSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Success",
        });

        console.log("Password reset send successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email: ${error}`);
        throw new Error(`Failed to send password reset success email: ${error}`);
    }
}