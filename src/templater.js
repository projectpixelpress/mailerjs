var fs = require('fs');

var parse_template = function(recipient, options, templatePath) {
  if (!templatePath) {
    console.log('Cannot parse template without knowing where your templates are');
    throw new Error('Cannot parse template without knowing where your templates are');
  }

  console.log('recipient: %o', recipient);
  if (recipient == null || recipient.name == null) {
      console.log('using default recipient');
      recipient = {
          name: 'Good sir'
      }
  }
  options = options || {};
  options.template_name = options.template_name || 'Verification';
  options.userName = options.userName || 'New User';
  options.verifyCode = options.verifyCode || 'NONE';
  options.url_to_send = options.url_to_send || 'http://bloxelsbuilder.com';

  var templateFile = fs.readFileSync(templatePath + '/' + options.template_name + '.html', 'utf8');
  var body = templateFile.split('*|USERNAME|*').join(options.userName);
  var body = body.split('*|ACTIVATION_CODE|*').join(options.verifyCode);
  var body = body.split('*|CLICK_HERE|*').join(options.url_to_send);
  var body = body.split('*|NAME_OF_RECIPIENT|*').join(recipient.name);

  return body;
}

module.exports = {
    parse_template: parse_template
};
