const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const fs = require('fs');

describe('templater', () => {
    describe('parse_template', () => {
        describe('with no templatePath', () => {
          let templater;
          let stubbedRead;
          beforeEach(() => {
              templater = require('./../src/templater');
              stubbedRead = sinon.stub(fs, 'readFileSync')
          });
          afterEach(() => {
              fs.readFileSync.restore();
          });
            it('does no work', () => {
                expect(templater.parse_template.bind()).to.throw('Cannot parse template without knowing where your templates are');
                expect(fs.readFileSync.callCount).to.equal(0);
            });
        });

        describe('with templatePath', () => {
            const templatePath = 'testTemplatePath';
            let templater;
            let stubbedRead;
            beforeEach(() => {
                templater = require('./../src/templater');
                stubbedRead = sinon.stub(fs, 'readFileSync')
                stubbedRead.returns('some text *|USERNAME|* *|ACTIVATION_CODE|**|ACTIVATION_CODE|**|NAME_OF_RECIPIENT|**|ACTIVATION_CODE|* *|CLICK_HERE|* *|NAME_OF_RECIPIENT|*');
            });
            afterEach(() => {
                fs.readFileSync.restore();
            });

            it('replaces variables', () => {
                const variables = [
                  '*|USERNAME|*',
                  '*|ACTIVATION_CODE|*',
                  '*|CLICK_HERE|*',
                  '*|NAME_OF_RECIPIENT|*',
                ];

                const actual = templater.parse_template({}, {}, templatePath);

                for (variable of variables) {
                    expect(actual.includes(variable)).to.be.false;
                }
            });

            it('default values', () => {
                stubbedRead.returns('*|USERNAME|* *|NAME_OF_RECIPIENT|* *|ACTIVATION_CODE|* *|CLICK_HERE|*');
                const actual = templater.parse_template({}, {}, templatePath);

                expect(actual).to.equal('New User Good sir NONE http://bloxelsbuilder.com');
            });

            it('defaults recipient name if it is not set ', () => {
                stubbedRead.returns('*|NAME_OF_RECIPIENT|*');
                const actual = templater.parse_template({email: 'who@cares.com'}, {}, templatePath);

                expect(actual).to.equal('Good sir');
            });

            it('reads name from recipient', () => {
                stubbedRead.returns('*|NAME_OF_RECIPIENT|*');
                const expectedName = "testy mcTesterson";
                const actual = templater.parse_template({name: expectedName}, {}, templatePath);

                expect(actual).to.equal(expectedName);
            });

            it('reads things from options', () => {
                stubbedRead.returns('*|USERNAME|**|ACTIVATION_CODE|**|CLICK_HERE|*');
                const expectedUsername = "testy_mcTesterson";
                const expectedVerifyCode = "verified";
                const expectedUrlToSend = "http://example.co";
                const actual = templater.parse_template({}, {
                  userName: expectedUsername,
                  verifyCode: expectedVerifyCode,
                  url_to_send: expectedUrlToSend,
                }, templatePath);

                expect(actual).to.equal(expectedUsername + expectedVerifyCode + expectedUrlToSend);
            });
        });
    });
});
