var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'pratispardha.22@gmail.com',
        pass: 'pratispardha',
    },
    secure: true,
});
module.exports = transporter;