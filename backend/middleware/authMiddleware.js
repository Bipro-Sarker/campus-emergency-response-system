const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No token provided. Access denied!' });
    }

    try {
        // "Bearer <token>" থেকে শুধু টোকেনটি আলাদা করা
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // req.user এর মধ্যে ইউজারের id এবং role সেভ করে রাখলাম
        next(); // টোকেন সঠিক হলে পরের ধাপে যেতে দিব
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token!' });
    }
};