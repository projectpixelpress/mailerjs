var chai = require('chai');
var expect = chai.expect;


describe('mailerjs', function() {
  it('should be import-able', function() {
    var testObject = require('./../src/mailer');
    expect(testObject).to.be.exist;
  });

  describe('once imported', function() {
    var mailerjs;
    before(function() {
      mailerjs = require('./../src/mailer');
    });

    it('should export a function called send_mandrill_to', function() {
      expect(mailerjs.send_mandrill_to).to.be.exist;
    });

    it('should export a function called send_ses_to', function() {
      expect(mailerjs.send_ses_to).to.be.exist;
    });

    it('should export a function called sendMail', function() {
      expect(mailerjs.sendMail).to.be.exist;
    });

    it('should export a function called emailMessage', function() {
      expect(mailerjs.emailMessage).to.be.exist;
    });
  });
});
