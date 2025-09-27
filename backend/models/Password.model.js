import mongoose from "mongoose";
import crypto from "crypto";

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Encryption key from environment variable (must be 32 bytes for AES-256)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here!';
const ALGORITHM = 'aes-256-cbc';

// Ensure key is exactly 32 bytes
const getKey = () => {
    const key = Buffer.from(ENCRYPTION_KEY, 'utf8');
    if (key.length < 32) {
        // Pad with zeros if too short
        return Buffer.concat([key, Buffer.alloc(32 - key.length)]);
    } else if (key.length > 32) {
        // Truncate if too long
        return key.slice(0, 32);
    }
    return key;
};

// Encrypt password before saving
passwordSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const key = getKey();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
        
        let encrypted = cipher.update(this.password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Store as iv:encrypted format
        this.password = iv.toString('hex') + ':' + encrypted;
        next();
    } catch (error) {
        console.error('Encryption error:', error);
        next(error);
    }
});

// Method to decrypt password
passwordSchema.methods.getDecryptedPassword = function() {
    try {
        const textParts = this.password.split(':');
        if (textParts.length !== 2) {
            console.error('Invalid encrypted password format');
            return null;
        }
        
        const iv = Buffer.from(textParts[0], 'hex');
        const encryptedText = textParts[1];
        const key = getKey();
        
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};

export const Password = mongoose.model("Password", passwordSchema);
