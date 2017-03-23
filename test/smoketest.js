const chai = require('chai');
const expect = chai.expect;


describe('smoketest - mailerjs', function() {
  it('should be import-able', function() {
    const testObject = require('./../index');
    expect(testObject).to.be.exist;
  });

  describe('once imported', function() {
    let mailerjs;
    before(function() {
      mailerjs = require('./../index');
    });

    it('should export a function called send_ses_to', function() {
      expect(mailerjs.send_ses_to).to.be.exist;
    });

    it('should export a function called sendMail', function() {
      expect(mailerjs.sendMail).to.be.exist;
    });

    it('should export a class called emailMessage', function() {
      expect(mailerjs.emailMessage).to.be.exist;
    });

    it('should export a function called parse_template', function() {
      expect(mailerjs.parse_template).to.be.exist;
    });
  });
});
