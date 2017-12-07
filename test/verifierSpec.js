const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect

const fs = require('fs');

describe('verifier', () => {
    let verifier;
    beforeEach(() => {
        verifier = require('./../src/verifier');
    });

    describe('verify_email', () => {
        it('rejects bad formatting', () => {
            return expect(verifier.verify_email('asdfasdf')).to.eventually.be.resolved;
        });

        it('rejects unreachable emails', () => {
            return expect(verifier.verify_email('evan@aNonexistentDomain.gov')).to.eventually.be.rejected;
        });

        it('resolves good emails', () => {
            return expect(verifier.verify_email('evan@projectpixelpress.com')).to.eventually.be.resolved;
        });
    });
});
