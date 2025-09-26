import { sendEmail } from './nodemailer.config.js';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);
        await sendEmail(email, "Please verify your email - Password Manager", html);
        console.log("Verification email sent successfully to:", email);
    } catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error(`Failed to send verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);
        await sendEmail(email, "Welcome to Password Manager!", html);
        console.log("Welcome email sent successfully to:", email);
    } catch (error) {
        console.error(`Error sending welcome email: ${error}`);
        throw new Error(`Failed to send welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        console.log("Preparing password reset email...");
        console.log("Email:", email);
        console.log("Reset URL:", resetURL);
        
        const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
        await sendEmail(email, "Password Reset Request - Password Manager", html);
        
        console.log("Password reset email sent successfully to:", email);
    } catch (error) {
        console.error(`Error sending password reset email: ${error}`);
        console.error("Error details:", error.message);
        throw new Error(`Failed to send password reset email: ${error.message}`);
    }
}

export const sendRestSuccessEmail = async (email) => {
    try {
        await sendEmail(email, "Password Reset Successful - Password Manager", PASSWORD_RESET_SUCCESS_TEMPLATE);
        console.log("Password reset success email sent successfully to:", email);
    } catch (error) {
        console.error(`Error sending password reset success email: ${error}`);
        throw new Error(`Failed to send password reset success email: ${error}`);
    }
}