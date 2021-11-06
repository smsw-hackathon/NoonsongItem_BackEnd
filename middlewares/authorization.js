const jwt = require('jsonwebtoken');
const messageCode = require('../modules/message');
const statusCode = require('../modules/status');

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token;

        var decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(statusCode.TOKEN_EXPIRED).json({
                code: statusCode.TOKEN_EXPIRED,
                messageCode: messageCode.TOKEN_EXPIRED
            });
        }

        return res.status(statusCode.UNAUTHORIZED).json({
            code: statusCode.UNAUTHORIZED,
            messageCode: messageCode.UNAUTHORIZED
        });        
    }

    return decoded;
};