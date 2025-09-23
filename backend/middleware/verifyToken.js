import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json({success: false, message: "Not authorized , no token provided"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({success: false, message: "Not authorized , invalid token"})
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({success: false, message: "Server Error, Not authorized"});
    }
}