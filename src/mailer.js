var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport(
    {
        service: "SES-US-WEST-2",
        auth: {
            user: "",
            pass: ""
        }
    }
);

module.exports = {
    smtpTransport: smtpTransport,
    sendMail: function(message) {
        if (!message) return false;
        this.smtpTransport.sendMail(message, function(error) {
            if (error) {
                console.log('Error %o', error.message);
                smtpTransport.close();
                return;
            } else {
                console.log('Message sent successfully!');
                smtpTransport.close();
                return;
            }
        });
    }
};
