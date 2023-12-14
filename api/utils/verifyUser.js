import errorHandle from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandle(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.KEY, (err, user) => {
        if (err) return next(errorHandle(403, 'Forbidden'));
        req.user = user;
        next()
    })


}