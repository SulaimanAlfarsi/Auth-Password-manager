import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token valid for 7 days
    });

    res.cookie("token", token, {
        httpOnly: true, //xss protection
        secure: process.env.NODE_ENV === 'production', // Set secure flag in production
        sameSite: 'Strict', // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};