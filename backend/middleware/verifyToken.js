import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    console.log('verifyToken - cookies:', req.cookies);
    console.log('verifyToken - token:', token);
    
    if(!token) {
        console.log('No token provided');
        return res.status(401).json({success: false, message: "Not authorized , no token provided"})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);

        if(!decoded) {
            console.log('Token decode failed');
            return res.status(401).json({success: false, message: "Not authorized , invalid token"})
        }
        req.userId = decoded.userId;
        console.log('Token verified, userId set to:', req.userId);
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({success: false, message: "Server Error, Not authorized"});
    }
}