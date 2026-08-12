exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // অ্যাডমিন হলে কাজ করতে পারবে
    } else {
        return res.status(403).json({ message: 'Access denied! Require Admin Role.' });
    }
};