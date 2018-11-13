const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "youth-redcross-karnataka-erp-model");
        next();
    } catch (errpr) {
        res.status(401).json({ message: "Authentication failed!"});
    }
};