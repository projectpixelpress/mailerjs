var nodemailer = require('nodemailer'),
    verifier = require('email-verify');
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
        verifier.verify(message.to, null, function(err, info) {
            console.log("info: %o", info);
            console.log("err: %o", err);
            if (err) return false;
            that.smtpTransport.sendMail(message, function(error) {
                console.log(logger.buildLog(message, error));
                that.smtpTransport.close();
                return;
            });
        });
    }
};
