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
        it('with no templatePath does no work', () => {
            expect(templater.parse_template.bind()).to.throw('Cannot null/empty parse template');
        });

        it('with templatePath replaces variables', () => {
            let replacements = {};
            replacements['*|USERNAME|*'] = 'userName';
            replacements['*|ACTIVATION_CODE|*'] = 'verifyCode';
            replacements['*|CLICK_HERE|*'] = 'url_to_send';
            replacements['*|NAME_OF_RECIPIENT|*'] = 'name';
            const template = 'some text *|USERNAME|* *|ACTIVATION_CODE|**|ACTIVATION_CODE|**|NAME_OF_RECIPIENT|**|ACTIVATION_CODE|* *|CLICK_HERE|* *|NAME_OF_RECIPIENT|*';

            const actual = templater.parse_template(template, replacements);

            expect(actual).to.equal('some text userName verifyCodeverifyCodenameverifyCode url_to_send name');
        });
    });
});
