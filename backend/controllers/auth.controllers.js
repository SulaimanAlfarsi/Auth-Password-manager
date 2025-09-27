import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendRestSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const { email ,password, name } = req.body;
    try {
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success:false, message:"User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
        const user = await User.create({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
            
            });

            await user.save();

            // JWT
            generateTokenAndSetCookie(res, user._id);

            await sendVerificationEmail(user.email, verificationToken);

            res.status(201).json({success:true,
            message:"User created successfully. Please verify your email.",
            user:{
                ...user._doc,
                password:undefined,
            }
        });

    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiry:{$gt:Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired verification code"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;

        await user.save();
        
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success:true,
            message:"Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
        
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false, message:"Invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false, message:"Invalid credentials"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = Date.now();
        await user.save();
        
        console.log('Login successful for user:', user.email);

        res.status(200).json({
            success:true,
            message:"Logged in successfully",
            user:{
                ...user._doc,
                password:undefined,
            }
        });

    } catch (error) {
        console.log("Error during login:", error);
        res.status(400).json({success:false, message:error.message});  
    }
}


export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({success:true, message:"Logged out successfully"});
};


export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    
    // Validate email format
    if (!email || !email.includes('@')) {
        return res.status(400).json({success:false, message:"Please enter a valid email address"});
    }
    
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message:"No account found with this email address"});
        }
        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour from now

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiresAt;

        await user.save();

        // Send email with the reset token 
        console.log("Sending password reset email to:", user.email);
        console.log("CLIENT_URL:", process.env.CLIENT_URL);
        const resetURL = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
        console.log("Reset URL:", resetURL);
        
        await sendPasswordResetEmail(user.email, resetURL);
        
        console.log("Password reset email sent successfully");
        res.status(200).json({success:true, message:"Password reset email sent"});
        
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(400).json({success:false, message:error.message});
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()}
        });

        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired password reset token"});
        }

        // Update password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        await sendRestSuccessEmail(user.email);

        res.status(200).json({success:true, message:"Password reset successfully"});


    } catch (error) {
        console.log("Error in resetPassword:", error);
        res.status(400).json({success:false, message:error.message});
    }
}


export const checkAuth = async (req, res) => {
    try {
        console.log('checkAuth called, userId:', req.userId);
        console.log('cookies:', req.cookies);
        
        const user = await User.findById(req.userId);
        if(!user){
            console.log('User not found for userId:', req.userId);
            return res.status(404).json({success:false, message:"User not found"});
        }
        console.log('User found:', user.email);
        
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:undefined,
            }
        });
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({success:false, message:error.message});
    }
}