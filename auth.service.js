const jwt = require('jsonwebtoken');


JWTsecret = "secret";

function createToken(username) {

    return jwt.sign({ username: username }, JWTsecret, { expiresIn: "100 days" });

}


function verifyJWT(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {

        jwt.verify(token, JWTsecret, function (err, decoded) {
            if (err) {
                return res.json({ title: "Authentication Failed", error: { success: false, message: 'Failed to authenticate token', errorObject: err } });
            } else {
                // if everything is good, save to request for use in other routes                
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}


module.exports = {
    createToken: createToken,
    verifyJWT: verifyJWT
}

