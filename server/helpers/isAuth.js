const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.JWT_SECRET);
        // console.log(decoded)
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}