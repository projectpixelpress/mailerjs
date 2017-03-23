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
            const expectedFrom = 'test@example.com';
            const expectedTo = 'worstUser@anotherEmail.gov';
            const expectedSubject = 'Here\'s some mail!';
            const expectedHtml = '<marquee>dummy</marquee>';
            const expectedText = 'dummy';
            const testObject = new mailerjs.emailMessage({
              from: expectedFrom,
              to: expectedTo,
              subject: expectedSubject,
              html: expectedHtml,
              text: expectedText,
            });

            expect(testObject.from).to.equal(expectedFrom);
            expect(testObject.to).to.equal(expectedTo);
            expect(testObject.subject).to.equal(expectedSubject);
            expect(testObject.html).to.equal(expectedHtml);
            expect(testObject.text).to.equal(expectedText);
        });
    });
});
