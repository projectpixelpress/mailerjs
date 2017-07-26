var nodemailer = require('nodemailer');
const verifier = require('./verifier');
const logger = require('./logger');

var smtpTransport = nodemailer.createTransport({
    service: "SES-US-WEST-2",
    auth: {
        user: "",
        pass: ""
    }
});

module.exports = {
    smtpTransport: smtpTransport,
    sendMail: function(message) {
        let that = this;
        if (!message) return false;
        verifier.verify_email(message.to).then(
            () => {
                that.smtpTransport.sendMail(message, function(error) {
                    console.log(logger.buildLog(message, error));
                    that.smtpTransport.close();
                    return;
                });
            },
            (error) => {
                console.log(logger.buildLog(message, error));
            }
        );
    }
};
