var nodemailer = require('nodemailer'),
    verifier   = require('email-verify');

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
        let that = this;
        if (!message) return false;
        verifier.verify(message.to,null,function(err,info) {
            console.log("info: %o",info);
            console.log("err: %o",err);
            if(err) return false;
            that.smtpTransport.sendMail(message, function(error) {
                if (error) {
                    console.log('Error %o', error.message);
                    that.smtpTransport.close();
                    return;
                } else {
                    console.log('Message sent successfully!');
                    that.smtpTransport.close();
                    return;
                }
            });
        });
    }
};
