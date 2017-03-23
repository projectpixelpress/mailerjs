var nodemailer = require('nodemailer'),
    fs = require('fs'),
    moment = require('moment'),
    mandrill = require('mandrill-api'),
    templatePath = 'lib/html',
    S = require('string');

// Create a Sendmail transport object
var transport = nodemailer.createTransport("Sendmail", "/usr/sbin/sendmail");

var smtpTransport = nodemailer.createTransport({
    service: "SES-US-WEST-2",
    auth: {
        user: "AKIAJJENTHZU7ZDJMNJQ",
        pass: "Akn+PlfKgTVrbaTYmN6XRC6ZDirMIflyV4avbSfjtcS0"
    }
    //"SMTP", {
    //service: "Gmail",
    //auth: {
    //user: "share@projectpixelpress.com",
    //pass: "Ridley888786"
    //}
});

class emailMessage {
    constructor(args) {
        this.from = args.from || "noreply@projectpixelpress.com";
        this.to = args.to || null;
        this.subject = args.subject || "message from ProjectPixelPress";
        this.html = args.html || "<h1>aloha</h1>";
        this.text = S(this.html).stripTags().s;
    }
}

var sendMail = function(message) {
    if (!message) return false;
    smtpTransport.sendMail(message, function(error) {
        if (error) {
            console.log("Error %o", error.message);
            smtpTransport.close();
            return;
        } else {
            console.log('Message sent successfully!');
            smtpTransport.close();
            return;
        }
    });
}

var send_ses_to = function(recipient, options) {
    //options = {template_name:'',subject:'',from:'',url_to_send:''}
    //recipient = { name: 'Good sir', email: 'brad@projectpixelpress.com' }
    if (options == null) options = {};
    console.log('recipient: %o', recipient);
    if (recipient == null || recipient.email == null) { // }|| recipient.name == null) {
        console.log('using default recipient');
        recipient = {
            name: 'Good sir',
            email: 'brad@projectpixelpress.com'
        }
    }
    if (options.template_name == null) options.template_name = 'Verification';
    if (options.userName == null) options.userName = 'New User';
    if (options.subject == null) options.subject = 'Test subject';
    if (options.from == null) options.from = 'support@bloxelsbuilder.com';
    if (options.verifyCode == null) options.verifyCode = 'NONE';
    if (options.url_to_send == null) options.url_to_send = 'http://bloxelsbuilder.com';

    var admin_email = "brad@projectpixelpress.com";

    var templateFile = fs.readFileSync(templatePath + "/" + options.template_name + ".html", "utf8");
    //console.log(templateFile);
    var body = templateFile.split("*|USERNAME|*").join(options.userName);
    var body = body.split("*|ACTIVATION_CODE|*").join(options.verifyCode);
    var body = body.split("*|CLICK_HERE|*").join(options.url_to_send);
    var body = body.split("*|NAME_OF_RECIPIENT|*").join(recipient.name);

    var message = new mailer.emailMessage({
        "subject": options.subject,
        "to": recipient.email,
        "bcc": admin_email,
        "html": body
    });

    sendMail(message);
}

module.exports = {
    send_ses_to: send_ses_to,
    sendMail: sendMail,
    emailMessage: emailMessage
};
