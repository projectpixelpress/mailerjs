var parse_template = function(recipient, options, template) {
  if (!template) {
    console.log('Cannot null/empty parse template');
    throw new Error('Cannot null/empty parse template');
  }

  console.log('recipient: %o', recipient);
  if (recipient == null || recipient.name == null) {
      console.log('using default recipient');
      recipient = {
          name: 'Good sir'
      }
  }
  options = options || {};
  options.userName = options.userName || 'New User';
  options.verifyCode = options.verifyCode || 'NONE';
  options.url_to_send = options.url_to_send || 'http://bloxelsbuilder.com';

  var body = template.split('*|USERNAME|*').join(options.userName);
  var body = body.split('*|ACTIVATION_CODE|*').join(options.verifyCode);
  var body = body.split('*|CLICK_HERE|*').join(options.url_to_send);
  var body = body.split('*|NAME_OF_RECIPIENT|*').join(recipient.name);

  return body;
}

module.exports = {
    parse_template: parse_template
};
