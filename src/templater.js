var fs = require('fs');

var parse_template = function(recipient, options, templatePath) {
  if (templatePath == null) {
    console.log('Cannot parse template without knowing where your templates are');
    return;
  }
  if (options == null) options = {};
  console.log('recipient: %o', recipient);
  if (recipient == null || recipient.email == null) {
      console.log('using default recipient');
      recipient = {
          name: 'Good sir'
      }
  }
  if (options.template_name == null) options.template_name = 'Verification';
  if (options.userName == null) options.userName = 'New User';
  if (options.from == null) options.from = 'support@bloxelsbuilder.com';
  if (options.verifyCode == null) options.verifyCode = 'NONE';
  if (options.url_to_send == null) options.url_to_send = 'http://bloxelsbuilder.com';

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
