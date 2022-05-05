var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'kushwahshailendra732@gmail.com',
        pass: 'sh@ilendr@',
    },
    secure: true,
});
module.exports = transporter;