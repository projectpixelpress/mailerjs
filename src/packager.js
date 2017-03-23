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

var send_ses_to = function(recipient, options, html_body) {
    //options = {template_name:'',subject:'',from:'',url_to_send:''}
    //recipient = { name: 'Good sir', email: 'brad@projectpixelpress.com' }
    if (!html_body) {
      console.log('Will not send anything without a html_body!');
      return;
    }

    console.log('recipient: %o', recipient);
    if (recipient == null || recipient.email == null) {
        console.log('using default recipient');
        recipient = {
            email: 'brad@projectpixelpress.com'
        }
    }

    options = options || {};
    options.subject = options.subject || 'Test subject';

    var admin_email = 'brad@projectpixelpress.com';

    var message = new emailMessage({
        'subject': options.subject,
        'to': recipient.email,
        'bcc': admin_email,
        'html': html_body
    });

    mailer.sendMail(message);
}

module.exports = {
    send_ses_to: send_ses_to,
    emailMessage: emailMessage,
};
