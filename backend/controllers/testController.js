import jwt from 'jsonwebtoken'
import { verifyToken } from '../middleware/verifyToken.js';

export const loggedIn = (req, res) => {
    console.log(req.userId);
    res.status(200).json({ message: "You are Authenticated" });
}


export const admin = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not Authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        if (!payload.isAdmin) return res.status(403).json({ message: "Not Authorized" });
    });

    res.status(200).json({ message: "You are Authenticated" });
}
