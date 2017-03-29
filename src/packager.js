const S = require('string'),
    mailer = require('./mailer');

class emailMessage {
    constructor(args) {
        Object.assign(this, args);
        this.from = args.from || 'noreply@projectpixelpress.com';
        this.to = args.to || null;
        this.subject = args.subject || 'message from ProjectPixelPress';
        this.html = args.html || '<h1>aloha</h1>';
        this.text = S(this.html).stripTags().s;
    }
}

const send = function(options, html_body) {
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

    const admin_email = 'brad@projectpixelpress.com';
    options.subject = options.subject || 'Test subject';
    options.bcc = admin_email;
    options.html = html_body;

    const message = new emailMessage(options);

    mailer.sendMail(message);
}

module.exports = {
    send: send,
    emailMessage: emailMessage,
};
