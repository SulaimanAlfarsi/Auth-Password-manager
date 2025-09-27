import { Password } from "../models/Password.model.js";

// Test endpoint to check if everything is working
export const testPassword = async (req, res) => {
    try {
        console.log('Test endpoint called');
        console.log('User ID from token:', req.userId);
        
        res.status(200).json({
            success: true,
            message: "Password endpoint is working",
            userId: req.userId
        });
    } catch (error) {
        console.error("Test error:", error);
        res.status(500).json({
            success: false,
            message: "Test failed",
            error: error.message
        });
    }
};

// Create a new password entry
export const createPassword = async (req, res) => {
    try {
        const { name, website, username, password, notes } = req.body;
        const userId = req.userId; // From verifyToken middleware

        // Validate required fields
        if (!name || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, username, and password are required"
            });
        }

        // Create new password entry
        const newPassword = new Password({
            userId,
            name,
            website,
            username,
            password, // Will be encrypted by the pre-save hook
            notes
        });

        await newPassword.save();

        // Return the password without the encrypted password field
        const passwordResponse = {
            _id: newPassword._id,
            name: newPassword.name,
            website: newPassword.website,
            username: newPassword.username,
            notes: newPassword.notes,
            createdAt: newPassword.createdAt,
            updatedAt: newPassword.updatedAt
        };

        res.status(201).json({
            success: true,
            message: "Password saved successfully",
            password: passwordResponse
        });

    } catch (error) {
        console.error("Error creating password:", error);
        console.error("Error details:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all passwords for a user
export const getUserPasswords = async (req, res) => {
    try {
        const userId = req.userId;

        const passwords = await Password.find({ userId }).select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            passwords
        });

    } catch (error) {
        console.error("Error fetching passwords:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get a specific password (with decrypted password)
export const getPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const password = await Password.findOne({ _id: id, userId });

        if (!password) {
            return res.status(404).json({
                success: false,
                message: "Password not found"
            });
        }

        // Get decrypted password
        const decryptedPassword = password.getDecryptedPassword();

        const passwordResponse = {
            _id: password._id,
            name: password.name,
            website: password.website,
            username: password.username,
            password: decryptedPassword,
            notes: password.notes,
            createdAt: password.createdAt,
            updatedAt: password.updatedAt
        };

        res.status(200).json({
            success: true,
            password: passwordResponse
        });

    } catch (error) {
        console.error("Error fetching password:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Update a password
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, website, username, password, notes } = req.body;
        const userId = req.userId;

        const existingPassword = await Password.findOne({ _id: id, userId });

        if (!existingPassword) {
            return res.status(404).json({
                success: false,
                message: "Password not found"
            });
        }

        // Update fields
        if (name) existingPassword.name = name;
        if (website !== undefined) existingPassword.website = website;
        if (username) existingPassword.username = username;
        if (password) existingPassword.password = password; // Will be encrypted by pre-save hook
        if (notes !== undefined) existingPassword.notes = notes;

        await existingPassword.save();

        // Return updated password without encrypted password field
        const passwordResponse = {
            _id: existingPassword._id,
            name: existingPassword.name,
            website: existingPassword.website,
            username: existingPassword.username,
            notes: existingPassword.notes,
            createdAt: existingPassword.createdAt,
            updatedAt: existingPassword.updatedAt
        };

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
            password: passwordResponse
        });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Delete a password
export const deletePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const password = await Password.findOneAndDelete({ _id: id, userId });

        if (!password) {
            return res.status(404).json({
                success: false,
                message: "Password not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Password deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting password:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

