import { generateKey } from "crypto";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

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

export const login = async (req, res) => {
    res.send("login Route");
}


export const logout = async (req, res) => {
    res.send("logout Route");
}
