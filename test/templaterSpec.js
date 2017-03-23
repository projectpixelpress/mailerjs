const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const fs = require('fs');

describe('templater', () => {
    let templater;
    beforeEach(() => {
        templater = require('./../src/templater');
    });
    describe('parse_template', () => {
        describe('with no templatePath', () => {
            it('does no work', () => {
                expect(templater.parse_template.bind()).to.throw('Cannot null/empty parse template');
            });
        });

        describe('with templatePath', () => {
            it('replaces variables', () => {
                const variables = [
                    '*|USERNAME|*',
                    '*|ACTIVATION_CODE|*',
                    '*|CLICK_HERE|*',
                    '*|NAME_OF_RECIPIENT|*',
                ];

                const actual = templater.parse_template({}, {}, 'some text *|USERNAME|* *|ACTIVATION_CODE|**|ACTIVATION_CODE|**|NAME_OF_RECIPIENT|**|ACTIVATION_CODE|* *|CLICK_HERE|* *|NAME_OF_RECIPIENT|*');

                for (variable of variables) {
                    expect(actual.includes(variable)).to.be.false;
                }
            });

            it('default values', () => {
                const actual = templater.parse_template({}, {}, '*|USERNAME|* *|NAME_OF_RECIPIENT|* *|ACTIVATION_CODE|* *|CLICK_HERE|*');

                expect(actual).to.equal('New User Good sir NONE http://bloxelsbuilder.com');
            });

            it('defaults recipient name if it is not set ', () => {
                const actual = templater.parse_template({
                    email: 'who@cares.com'
                }, {}, '*|NAME_OF_RECIPIENT|*');

                expect(actual).to.equal('Good sir');
            });

            it('reads name from recipient', () => {
                const expectedName = "testy mcTesterson";
                const actual = templater.parse_template({
                    name: expectedName
                }, {}, '*|NAME_OF_RECIPIENT|*');

                expect(actual).to.equal(expectedName);
            });

            it('reads things from options', () => {
                const expectedUsername = "testy_mcTesterson";
                const expectedVerifyCode = "verified";
                const expectedUrlToSend = "http://example.co";
                const actual = templater.parse_template({}, {
                    userName: expectedUsername,
                    verifyCode: expectedVerifyCode,
                    url_to_send: expectedUrlToSend,
                }, '*|USERNAME|**|ACTIVATION_CODE|**|CLICK_HERE|*');

                expect(actual).to.equal(expectedUsername + expectedVerifyCode + expectedUrlToSend);
            });
        });
    });
});
