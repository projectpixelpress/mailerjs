const emailVerify = require('email-verify');

module.exports = {
    verify_email: (email) => {
        return new Promise((resolve, reject) => {
            let verifyOptions = {
                port : 25,
                sender : 'share@projectpixelpress.com',
                fqdn : 'smtp.gmail.com',
                debug: true
            };
            let individualOptions = Object.assign({email:email},verifyOptions);
            emailVerify.verify(individualOptions, null, function(err, info) {
                console.log("info: %o", info);
                console.log("err: %o", err);
                if (err) {
                    reject(err);
                } else if (!info.success) {
                    reject(info);
                } else {
                    resolve(info);
                }
            });
        });
    }
}
