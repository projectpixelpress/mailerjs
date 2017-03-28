const mailer = require('./src/mailer');
const packager = require('./src/packager');
const templater = require('./src/templater');
var nodemailer = require('nodemailer');

const extraParams = function() {
    console.log("extra params: %o",arguments);

    delete mailer.smtpTransport;
    mailer.smtpTransport = nodemailer.createTransport(
        "SMTP", {
            service: "Gmail",
            auth: {
                user: "share@projectpixelpress.com",
                pass: "Ridley888786"
            }
        }
    );

    return Object.assign(extraParams, mailer, packager, templater);
}
module.exports = Object.assign(extraParams, mailer, packager, templater);
