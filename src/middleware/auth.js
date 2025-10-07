const jwt = require("jsonwebtoken")

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.info("AuthHeader", authHeader)

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

}

module.exports = authMiddleWare