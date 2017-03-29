const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const mailer = require('./../src/mailer');

describe('packager', () => {
    let packager;
    before(() => {
        packager = require('./../src/packager');
    });
    describe('emailMessage', () => {
        it('default values', () => {
            const testObject = new packager.emailMessage({});

            expect(testObject.from).to.equal('noreply@projectpixelpress.com');
            expect(testObject.to).to.be.null;
            expect(testObject.subject).to.equal('message from ProjectPixelPress');
            expect(testObject.html).to.equal('<h1>aloha</h1>');
            expect(testObject.text).to.equal('aloha');
        });

        it('can be overridden with real values', () => {
            expected = {
                from: 'test@example.com',
                to: 'worstUser@anotherEmail.gov',
                subject: 'Here\'s some mail!',
                html: '<marquee>dummy</marquee>',
                text: 'dummy',
            };
            const testObject = new packager.emailMessage(expected);

            expect(testObject.from).to.equal(expected.from);
            expect(testObject.to).to.equal(expected.to);
            expect(testObject.subject).to.equal(expected.subject);
            expect(testObject.html).to.equal(expected.html);
            expect(testObject.text).to.equal(expected.text);
        });

        it('adds everything w/o a default', () => {
            expected = {
                unexpected: 'spanish inquisition'
            };
            const testObject = new packager.emailMessage(expected);

            expect(testObject.unexpected).to.equal(expected.unexpected);
        });
    });
    describe('send', () => {
        beforeEach(() => {
            sinon.stub(mailer, 'sendMail');
        });
        afterEach(() => {
            mailer.sendMail.restore();
        });

        it('defaults', () => {
            const expectedBody = 'a very hot body';

            packager.send(null, expectedBody);

            expect(mailer.sendMail.calledOnce).to.be.true;
            actual = mailer.sendMail.getCall(0).args[0];
            expect(actual.subject).to.equal('message from ProjectPixelPress');
            expect(actual.html).to.equal(expectedBody);
            expect(actual.to).to.equal('brad@projectpixelpress.com');
        });

        it('defaults recipient email if it is not set ', () => {
            packager.send({
                name: "who cares"
            }, 'a body');

            expect(mailer.sendMail.calledOnce).to.be.true;
            actual = mailer.sendMail.getCall(0).args[0];
            expect(actual.to).to.equal('brad@projectpixelpress.com');
        });

        it('bccs the admin', () => {
            packager.send(null, 'a very hot body');

            expect(mailer.sendMail.calledOnce).to.be.true;
            actual = mailer.sendMail.getCall(0).args[0];
            expect(actual.bcc).to.equal('brad@projectpixelpress.com');
        });

        it('will add other fields to the message, like \'from\'', () => {
            const expectedFromField = 'gravy@boat.net';

            packager.send({from: expectedFromField}, 'a very hot body');

            expect(mailer.sendMail.calledOnce).to.be.true;
            actual = mailer.sendMail.getCall(0).args[0];
            expect(actual.from).to.equal(expectedFromField);
        });

        it('will not send without a body', () => {
            expect(packager.send.bind()).to.throw('Cannot send an email with an empty body');
            expect(packager.send.bind({})).to.throw('Cannot send an email with an empty body');
            expect(packager.send.bind(null, null)).to.throw('Cannot send an email with an empty body');
            expect(mailer.sendMail.callCount).to.equal(0);
        });

        it('reads from recipient for email', () => {
            const expectedEmail = 'anEmail@totally.org';

            packager.send({
                to: expectedEmail
            }, 'a body');

            expect(mailer.sendMail.calledOnce).to.be.true;
            actual = mailer.sendMail.getCall(0).args[0];
            expect(actual.to).to.equal(expectedEmail);
        });

        it('reads from options for subject', () => {
            const expectedSubject = 'Subject to further investigation';

            packager.send({
                subject: expectedSubject
            }, 'a body');

            expect(mailer.sendMail.calledOnce).to.be.true;
            actual = mailer.sendMail.getCall(0).args[0];
            expect(actual.subject).to.equal(expectedSubject);
        });
    });
});
