var nodemailer = require('nodemailer');
const verifier = require('./verifier');
const async    = require('async');
const logger   = require('./logger');

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
        if(!Array.isArray(message)) {
            verifier.verify_email(message.to).then(
                () => {
                    that.smtpTransport.sendMail(message, function(sendError) {
                        console.log(logger.buildLog(message, sendError));
                        that.smtpTransport.close();
                        return;
                    });
                },
                (verifyError) => {
                    console.log(logger.buildLog(message, verifyError));
                }
            );
        } else {
            let asyncTasks = [];
            for(var i=0;i<message.length;i++) {
                let newMessage = message[i];
                asyncTasks.push(function(callback) {
                    verifier.verify_email(newMessage.to).then(
                        () => {
                            that.smtpTransport.sendMail(newMessage, function(sendError) {
                                if(sendError!==null) console.log(logger.buildLog(newMessage, sendError));
                                callback();
                            });
                        },
                        (verifyError) => {
                            console.log(logger.buildLog(newMessage, verifyError));
                            callback();
                        }
                    );
                });
            }
            async.parallel(asyncTasks, function() {
                console.log("sent all the things");
                that.smtpTransport.close();
            });
        }
    }
};
