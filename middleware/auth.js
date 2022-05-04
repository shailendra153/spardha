const jwt = require('jsonwebtoken');

exports.tokenVerification = (req, res, next) => {
    try {
        console.log('token ' + req.headers.authorization);
        if (!req.headers.authorization) {
            return res.status(401).send('Unknown request');
        }
        if (req.headers.authorization === null) {
            return res.status(401).send('Unknown request');
        }

        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.verify(token, 'adkgshubhambahutsamjhhdarhkabhigaltinhikrteckjbgjkab');
        console.log(token);
        console.log(payload);
        next();
    } catch (error) {
        return res.status(401).send('Unknown request')
    }
}
