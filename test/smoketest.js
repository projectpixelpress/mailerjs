var chai = require('chai');
var expect = chai.expect;


describe('mailerjs', function() {
  it('should be import-able', function() {
    var testObject = require('./../src/mailer');
    expect(testObject).to.exist;
  });
});
