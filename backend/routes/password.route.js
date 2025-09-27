import express from "express";
import { 
    testPassword,
    createPassword, 
    getUserPasswords, 
    getPassword, 
    updatePassword, 
    deletePassword
} from "../controllers/password.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Test endpoint
router.get("/test", testPassword);

// Create a new password
router.post("/", createPassword);

// Get all passwords for the authenticated user
router.get("/", getUserPasswords);

// Get a specific password (with decrypted password)
router.get("/:id", getPassword);

// Update a password
router.put("/:id", updatePassword);

// Delete a password
router.delete("/:id", deletePassword);

export default router;
