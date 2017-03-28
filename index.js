const mailer = require('./src/mailer');
const packager = require('./src/packager');
const templater = require('./src/templater');
var nodemailer = require('nodemailer');

const extraParams = function() {
    console.log("extra params: %o",arguments);

    if(arguments && arguments["transport"] && arguments["transport"] === "gmail") {
    delete mailer.smtpTransport;
    mailer.smtpTransport = nodemailer.createTransport(
        "SMTP", {
            service: "Gmail",
            auth: {
                user: "share@projectpixelpress.com",
                pass: "***REMOVED***"
            }
        }
    );
    }

    return Object.assign(extraParams, mailer, packager, templater);
}
module.exports = Object.assign(extraParams, mailer, packager, templater);
