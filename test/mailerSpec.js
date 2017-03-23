const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


describe('mailerjs', function() {
    let mailerjs;
    before(function() {
        mailerjs = require('./../src/mailer');
    });
    describe('emailMessage', function() {
        it('default values', function() {
            const testObject = new mailerjs.emailMessage({});

            expect(testObject.from).to.equal("noreply@projectpixelpress.com");
            expect(testObject.to).to.be.null;
            expect(testObject.subject).to.equal("message from ProjectPixelPress");
            expect(testObject.html).to.equal("<h1>aloha</h1>");
            expect(testObject.text).to.equal("aloha");
        });

        it('can be overridden with real values', function() {
            expected = {
              from: 'test@example.com',
              to: 'worstUser@anotherEmail.gov',
              subject: 'Here\'s some mail!',
              html: '<marquee>dummy</marquee>',
              text: 'dummy',
            };
            const testObject = new mailerjs.emailMessage(expected);

            expect(testObject.from).to.equal(expected.from);
            expect(testObject.to).to.equal(expected.to);
            expect(testObject.subject).to.equal(expected.subject);
            expect(testObject.html).to.equal(expected.html);
            expect(testObject.text).to.equal(expected.text);
        });

        it('adds everything w/o a default', function() {
          expected = {
            unexpected: 'spanish inquisition'
          };
          const testObject = new mailerjs.emailMessage(expected);

          expect(testObject.unexpected).to.equal(expected.unexpected);
        });
    });
});
