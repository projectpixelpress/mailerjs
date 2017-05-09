const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const fs = require('fs');

describe('verifier', () => {
    let verifier;
    beforeEach(() => {
        verifier = require('./../src/verifier');
    });

    describe('verify_email', () => {
        it('rejects bad formatting', () => {
            verifier.verify_email('asdfasdf').should.be.rejected;
        });

        it('rejects unreachable emails', () => {
            verifier.verify_email('evan@aNonexistentDomain.gov').should.be.rejected;
        });

        it('resolves good emails', () => {
            verifier.verify_email('evan@projectpixelpress.com').should.be.rejected;
        });
    });
});
