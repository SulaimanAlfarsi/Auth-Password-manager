import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    restPasswordToken: String,
    restPasswordExpires: Date,
    verifcationToken: String,
    verifcationTokenExpires: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;