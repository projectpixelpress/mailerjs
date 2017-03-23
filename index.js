const mailer = require('./src/mailer');
const packager = require('./src/packager');
const templater = require('./src/templater');

module.exports = Object.assign(mailer, packager, templater);
