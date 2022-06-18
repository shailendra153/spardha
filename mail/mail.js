 var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 2525,
    host: "smtp.elasticemail.com",
    auth: {
        user: 'pratispardha.22@gmail.com',
        pass: '3F64BACB6E2EA7009EB91A375BFE636251AF',
    },
    secure: true,
});
module.exports = transporter;
