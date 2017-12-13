const emailVerify = require('email-verify');

const infoCodes = {
    finishedVerification: 1,
    invalidEmailStructure: 2,
    noMxRecords: 3,
    SMTPConnectionTimeout: 4,
    domainNotFound: 5,
    SMTPConnectionError: 6
}

let simple_verify = (email, options, callback) => {

  var success = false;

  if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
    success = false;
  } else {
    success = true;
  }

  return callback(null, { success: success, info: (email + ' is ' + (success ? 'a valid' : 'an invalid') + ' address'), addr: email, code: infoCodes.finishedVerification, tryagain:false, banner:'' })
}

module.exports = {

    verify_email: (email, strictVerification) => {

        if(strictVerification === undefined) strictVerification = true;

        let verifyOptions = {
            port : 25,
            sender : 'share@projectpixelpress.com',
            fqdn : 'smtp.gmail.com',
            debug: true
        };

        let verificationMethod = simple_verify;
        if(strictVerification){
          verificationMethod = emailVerify.verify;
        }

        return new Promise((resolve, reject) => {
            verificationMethod(email, verifyOptions, function(err, info) {
                console.log("a;sldkgjas;dlfjk info: %o", info);
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
