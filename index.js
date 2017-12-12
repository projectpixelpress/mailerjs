var nodemailer = require('nodemailer');

const mailer = require('./src/mailer');
const packager = require('./src/packager');
const templater = require('./src/templater');
const verifier = require('./src/verifier');

const extraParams = function(options) {
	if(options && options.username && options.password) {
		let pooling = options.pooling || false;

		let service = null;

		let transport = options.transport.toLowerCase();

		switch(transport) {
			case 'gmail' :
				service = 'Gmail';
			break;

			case 'mandrill' :
				service = 'Mandrill';
			break;

			case 'ses' :
				service = 'SES-US-WEST-2';
			break;

			default :
				service = 'SES-US-WEST-2';
			break;
		}

		delete mailer.smtpTransport;

		mailer.smtpTransport = nodemailer.createTransport({
			service: service,
			pool: pooling,
			auth: {
				user: options.username,
				pass: options.password
			}
		});
	}
	else {
        throw new Error("Need to supply (at least) username and password in constructor");
    }

    return Object.assign(extraParams, mailer, packager, templater, verifier);
}

module.exports = Object.assign(extraParams, mailer, packager, templater, verifier);
