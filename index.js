const mailer = require('./src/mailer');
const packager = require('./src/packager');
const templater = require('./src/templater');
const verifier = require('./src/verifier');
var nodemailer = require('nodemailer');

const extraParams = function() {
    console.log("extra params: %o",arguments);

    if(!!arguments && !!arguments[0]["username"] && !!arguments[0]["password"]) {
        if(!!arguments && arguments[0]["transport"] && arguments[0]["transport"] === "gmail") {
            console.log("changing to gmail");
            delete mailer.smtpTransport;
            mailer.smtpTransport = nodemailer.createTransport(
                {
                    service: "Gmail",
                    auth: {
                        user: arguments[0]["username"],
                        pass: arguments[0]["password"]
                    }
                }
            );
        } else {
            mailer.smtpTransport = nodemailer.createTransport(
                {
                    service: "SES-US-WEST-2",
                    auth: {
                        user: arguments[0]["username"],
                        pass: arguments[0]["password"]
                    }
                }
            );
        }
    } else {
        throw new Error("need to supply (at least) username and password in constructor");
    }

    return Object.assign(extraParams, mailer, packager, templater, verifier);
}
module.exports = Object.assign(extraParams, mailer, packager, templater, verifier);
