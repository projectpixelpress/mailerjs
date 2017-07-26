const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const logger = require('./../src/logger');

describe('logger', () => {
    let logger;
    before(() => {
        logger = require('./../src/logger');
    });

    describe('buildLog', () => {
        it('includes the sent object', () => {
            const expected = {to: 'me', from: 'you', subject: 'with love'};

            const actual = logger.buildLog(expected);

            expect(actual.payload).to.equal.expected;
        });

        it('does not paste the entire email into the logs', () => {
            const expected = {text: 'long, gratuitous text', html: '<strong>long, gratuitous text</strong>'};

            const actual = logger.buildLog(expected);

            expect(actual.payload.html).to.be.undefined;
            expect(actual.payload.text).to.be.undefined;
        });

        describe('on successful send', () => {
            it('sets the status', () => {
                const actual = logger.buildLog(null, null);

                expect(actual.status).to.equal('success');
            });

            it('shows a success message', () => {
                const expected = 'Message sent successfully!';

                const actual = logger.buildLog(null, null);

                expect(actual.message).to.equal(expected);
            });
        });

        describe('on send failure', () => {
            it('sets the status', () => {
                const input = {};

                const actual = logger.buildLog(null, input);

                expect(actual.status).to.equal('error');
            });

            it('shows a success message', () => {
                const expected = 'a verry bad error';
                const input = {message:expected};

                const actual = logger.buildLog(null, input);

                expect(actual.message).to.equal(expected);
            });
        });
    });
});
