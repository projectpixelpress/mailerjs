const S = require('string'),
    mailer = require('./mailer');

class emailMessage {
    constructor(args) {
        for (var property in args) {
            this[property] = args[property];
        }
        this.from = args.from || 'noreply@projectpixelpress.com';
        this.to = args.to || null;
        this.subject = args.subject || 'message from ProjectPixelPress';
        this.html = args.html || '<h1>aloha</h1>';
        this.text = S(this.html).stripTags().s;
    }
}

var send_ses_to = function(options, html_body) {
    //options = {to: 'brad@projectpixelpress.com', template_name:'',subject:'',from:'',url_to_send:''}
    if (!html_body) {
        console.log('Will not send anything without a html_body!');
        throw new Error('Cannot send an email with an empty body');
    }

    options = options || {};
    if (!options.to) {
        console.log('using default recipient');
        options.to = 'brad@projectpixelpress.com';
    } else {
        console.log('options: %o', options);
    }


    options.subject = options.subject || 'Test subject';

    var admin_email = 'brad@projectpixelpress.com';

    var message = new emailMessage({
        'subject': options.subject,
        'to': options.to,
        'bcc': admin_email,
        'html': html_body
    });

    mailer.sendMail(message);
}

module.exports = {
    send_ses_to: send_ses_to,
    emailMessage: emailMessage,
};
