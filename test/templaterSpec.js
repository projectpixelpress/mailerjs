const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const fs = require('fs');

describe('templater', () => {
    let templater;
    beforeEach(() => {
        templater = require('./../src/templater');
        sinon.stub(fs, 'readFileSync')
    });
    afterEach(() => {
      fs.readFileSync.restore();
    });
    describe('parse_template', () => {
        it('does no work when it lacks a templatePath', () => {
            expect(templater.parse_template.bind()).to.throw('Cannot parse template without knowing where your templates are');
            expect(fs.readFileSync.callCount).to.equal(0);
        });
    });
});
