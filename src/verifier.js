const emailVerify = require('email-verify');

module.exports = {
    verify_email: (email) => {
        return new Promise((resolve, reject) => {
            emailVerify.verify(email, null, function(err, info) {
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
