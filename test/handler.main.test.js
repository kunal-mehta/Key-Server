const { expect } =require('chai')
const { mock } = require('sinon');
const main = require('../app/handlers/main');

describe('Handler', () => {
    describe('generateKey', () => {
        it('should generate a new key', () => {
            const mockDb = mock(main.key.database);
            const data = {
                message: "Key Kept Alive"
            }
           mockDb.expects("generateKey").returns(Promise.resolve(data));
           const output = {
               statusCode: 200,
               body: JSON.stringify(data)
           }
           return main.generateKey()
            .then(result =>  {
                expect(result).to.be.eql(output)
                return mockDb.restore();
            })
        })
    })

    describe('allocateKey', () => {
        it('should allocate a new key from the existing pool', () => {
            const mockDb = mock(main.key.database);
            const data = [{
                keyid: "somevalidkeyid"
            }]
            mockDb.expects("allocateKey").returns(Promise.resolve(data));
            const output = {
               statusCode: 200,
               body: JSON.stringify(data[0])
           }
           return main.allocateKey()
            .then(result =>  {
                expect(result).to.be.eql(output)
                return  mockDb.restore();
            })
        });

        it('should return an empty array if no key is avaialble', () => {
            const mockDb = mock(main.key.database);
            const data = [];
            mockDb.expects("allocateKey").returns(Promise.resolve(data));
            const output = {
               statusCode: 404,
               body: JSON.stringify({
                 message: 'No keys available for now'
               })
           }
           return main.allocateKey()
            .then(result =>  {
                expect(result).to.be.eql(output)
                return mockDb.restore();
            })
        });
    })

    describe('unblockKey', () => {
        it('should unblock a key', () => {
            const mockDb = mock(main.key.database);
            const data = {
                message: 'Key Released'
            };
            mockDb.expects("unblockKey").withArgs().returns(Promise.resolve(data));
            const output = {
               statusCode: 200,
               body: JSON.stringify(data)
           }
           return main.unblockKey({
            pathParameters: {
                keyId: 'someValidKeyId'
            }
         })
         .then(result =>  {
                expect(result).to.be.eql(output)
                return mockDb.restore();
            })
        });
    })

    describe('deleteKey', () => {
        it('should delete a key', () => {
            const mockDb = mock(main.key.database);
            const data = {
                message: 'Key Purged'
            };
            mockDb.expects("deleteKey").returns(Promise.resolve(data));
            const output = {
               statusCode: 200,
               body: JSON.stringify(data)
           }
           return main.deleteKey({
            pathParameters: {
                keyId: 'someValidKeyId'
            }
        })
        .then(result =>  {
            expect(result).to.be.eql(output)
            return mockDb.restore();
            });
        });
    });

    describe('keepAliveKey', () => {
        it('should update the key time', () => {
            const mockDb = mock(main.key.database);
            const data = {
                message: "Key Kept Alive"
            }
            mockDb.expects("keepAliveKey").returns(Promise.resolve(data));
            const output = {
                statusCode: 200,
                body: JSON.stringify(data)
            }
            return main.keepAliveKey({
                pathParameters: {
                    keyId: 'someValidKeyId'
                }
            })
            .then(result =>  {
                expect(result).to.be.eql(output)
                return mockDb.restore();
            });
        });
    })

    describe('purgeSLAPassedKeys', () => {
        it('should purge the unused key', () => {
            const data = null
            const mockDb = mock(main.key.database);
            mockDb.expects("purgeSLAPassedKeys").returns(Promise.resolve(data));
            return main.purgeSLAPassedKeys()
                .then(result =>  {
                    expect(result).to.be.eql({
                    body: "null",
                    statusCode: 200
                })
                return mockDb.restore();
            })
        });
    })
})