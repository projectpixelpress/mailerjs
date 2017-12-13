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
            let email = 'asdf';
            return verifier.verify_email(email).then(
              () => {
                return expect.fail("", "", "fails because "+email+" is a valid email");
              },
              () => {
              }
            )
        });

        it('rejects unreachable emails', () => {
            let email = 'evan@aNonexistentDomain.gov';
            return verifier.verify_email(email).then(
              () => {
                return expect.fail("", "", "fails because "+email+" is a valid email");
              },
              () => {
              }
            )
        });

        it('resolves good emails', () => {
            let email = 'evan@projectpixelpress.com';
            return verifier.verify_email(email).then(
              () => {
              },
              () => {
                return expect.fail("", "", "fails because "+email+" is an invalid email");
              }
            )
        });

        it('rejects with simple email format', () => {
            let email = 'asdf@asdf';
            return verifier.verify_email(email, false).then(
              () => {
              },
              (rejectReason) => {
                return expect.fail("", "", "fails because "+email+" is a valid email");
              }
            )
        });

        it('resolves with simple email', () => {
            let email = 'matt.scaperoth@projectpixelpress.com';
            return verifier.verify_email(email, false).then(
              () => {
                return expect.fail("", "", "fails because "+email+" is not a valid email");
              },
              () => {
              }
            )
        });
    });
});
