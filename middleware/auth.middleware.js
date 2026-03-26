import jwt from 'jsonwebtoken';
import User from "../db/models/user.model.js";

export const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({error: 'No token provided'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).send({error: 'User not found'});
        }
        if (!user.isActive) {
            return res.status(403).send({error: 'User is blocked'});
        }
        req.user = user;
        next()
    } catch (err) {
        return res.status(401).send({error: 'Invalid token'});
    }
}
