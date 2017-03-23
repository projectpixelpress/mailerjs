var nodemailer   = require('nodemailer'),
    fs           = require('fs'),
    moment       = require('moment'),
    mandrill     = require('mandrill-api'),
    templatePath = __base + 'lib/html',
	S            = require('string');

// Create a Sendmail transport object
var transport = nodemailer.createTransport("Sendmail", "/usr/sbin/sendmail");

var Class = function(methods) {
	var klass = function() {
		this.initialize.apply(this, arguments);
	};

	for (var property in methods) {
		klass.prototype[property] = methods[property];
	}

	if (!klass.prototype.initialize) klass.prototype.initialize = function(){};

	return klass;
};

var smtpTransport = nodemailer.createTransport(
    {
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

var emailMessage = Class({
	initialize: function(arguments) {
		this.from      = arguments.from    || "noreply@projectpixelpress.com";
		this.to        = arguments.to      || null;
		this.subject   = arguments.subject || "message from ProjectPixelPress";
		this.html      = arguments.html    || "<h1>aloha</h1>";
		this.text      = S(this.html).stripTags().s;
		//console.log("EMAIL SENT: %o", this);
	}
});

var sendMail = function(message) {
	if(!message) return false;
	smtpTransport.sendMail(message, function(error){
		if(error){
			console.log("Error %o", error.message);
			smtpTransport.close();
			return;
		}
		else {
			console.log('Message sent successfully!');
			smtpTransport.close();
			return;
		}
	});
}

var send_ses_to = function(recipient,options) {
    //options = {template_name:'',subject:'',from:'',url_to_send:''}
    //recipient = { name: 'Good sir', email: 'brad@projectpixelpress.com' }
    if(options == null) options={};
    console.log('recipient: %o',recipient);
    if(recipient == null || recipient.email == null ) { // }|| recipient.name == null) {
        console.log('using default recipient');
        recipient = {
            name  : 'Good sir',
            email : 'brad@projectpixelpress.com'
        }
    }
    if(options.template_name == null) options.template_name = 'Verification';
    if(options.userName      == null) options.userName      = 'New User';
    if(options.subject       == null) options.subject       = 'Test subject';
    if(options.from          == null) options.from          = 'support@bloxelsbuilder.com';
    if(options.verifyCode    == null) options.verifyCode    = 'NONE';
    if(options.url_to_send   == null) options.url_to_send   = 'http://bloxelsbuilder.com';

    var admin_email = "brad@projectpixelpress.com";

    var templateFile = fs.readFileSync(templatePath+"/"+options.template_name+".html", "utf8");
    //console.log(templateFile);
    var body = templateFile.split("*|USERNAME|*").join(options.userName);
    var body = body.split("*|ACTIVATION_CODE|*").join(options.verifyCode);
    var body = body.split("*|CLICK_HERE|*").join(options.url_to_send);
    var body = body.split("*|NAME_OF_RECIPIENT|*").join(recipient.name);

    var message = new mailer.emailMessage({
        "subject" : options.subject,
        "to"      : recipient.email,
        "bcc"     : admin_email,
        "html"    : body
    });

    sendMail(message);
}

var send_mandrill_to = function(recipient,options) {
    //options = {template_name:'',subject:'',from:'',url_to_send:''}
    //recipient = { name: 'Good sir', email: 'brad@projectpixelpress.com' }
    if(options == null) options={};
    mandrill_client = new mandrill.Mandrill('FVbvGFPv1BIaFBr_V0fYHg');
    console.log('recipient: %o',recipient);
    if(recipient == null || recipient.email == null ) { // }|| recipient.name == null) {
        console.log('using default recipient');
        recipient = {
            name  : 'Good sir',
            email : 'brad@projectpixelpress.com'
        }
    }
    //if(options.send_at       == null) options.send_at       = moment().format('YYYY-MM-DD HH:mm:ss');
    if(options.template_name == null) options.template_name = 'Verification';
    if(options.userName      == null) options.userName      = 'New User';
    if(options.subject       == null) options.subject       = 'Test subject';
    if(options.from          == null) options.from          = 'support@bloxelsbuilder.com';
    if(options.verifyCode    == null) options.verifyCode    = 'NONE';
    if(options.url_to_send   == null) options.url_to_send   = 'http://bloxelsbuilder.com';
    var message = {
        'subject'    : options.subject,
        'from_email' : options.from,
        'from_name'  : 'Bloxels Builder',
        'to': [{
                'email' : recipient.email,
                'name'  : recipient.name,
                'type'  : 'to'
            }],
        'headers': {
            'Reply-To': options.from
        },
        'important': false,
        'merge': true,
        'merge_language': 'mailchimp',
        'global_merge_vars': [
            {
                'name': 'CLICK_HERE',
                'content': options.url_to_send
            },
            {
                'name': 'NAME_OF_RECIPIENT',
                'content': recipient.name
            },
            {
                'name': 'USERNAME',
                'content': options.userName
            },
            {
                'name': 'ACTIVATION_CODE',
                'content': options.verifyCode
            },
        ]
    };
    var async = false;
    var ip_pool = 'Main Pool';
    var sendOptions = {
            'template_name'    : options.template_name,
            'template_content' : [],
            'message'          : message,
            'async'            : async,
    }
    if(options.send_at) sendOptions.send_at = options.send_at;
    mandrill_client.messages.sendTemplate(sendOptions,
        function(result) {
            console.log(result);
            return result;
        }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        return false;
    });

}

module.exports = {
	send_mandrill_to : send_mandrill_to,
	send_ses_to      : send_ses_to,
	sendMail         : sendMail,
	emailMessage     : emailMessage
};
