const { verify } = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({"error": 'JWT token is missing.'});
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, process.env.TOKEN_SECRET);

        const { sub } = decoded;

        req.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        return res.status(401).json({"error": 'Invalid JWT token.'});
    }
}

module.exports = authMiddleware