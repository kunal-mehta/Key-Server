const assert = require('assert');
const { expect } =require('chai')
const { mock } = require('sinon');
const Key = require('../app/controller/key');
const Database = require('../app/db/db');

describe('Controller', () => {
    describe('generateKey', () => {
        it('should generate a new key', () => {
            const key = new Key();
            const mockDb = mock(key.database);
            const data = {
                message: "Key Kept Alive"
            }
           mockDb.expects("generateKey").returns(data);
           return expect(key.generateKey()).to.equal(data);
        })
    })

    describe('allocateKey', () => {
        it('should allocate a new key from the existing pool', () => {
            const key = new Key();
            const mockDb = mock(key.database);
            const data = [{
                keyid: "somevalidkeyid"
            }]
           mockDb.expects("allocateKey").returns(data);
           return expect(key.allocateKey()).to.equal(data);
        });

        it('should return an empty array if no key is avaialble', () => {
            const key = new Key();
            const mockDb = mock(key.database);
            const data = []
            mockDb.expects("allocateKey").returns(data);
            return expect(key.allocateKey()).to.equal(data);
        });
    })

    describe('unblockKey', () => {
        it('should unblock a key', () => {
            const key = new Key();
            const mockDb = mock(key.database);
            const data = {
                message: "Key Released"
            }
            mockDb.expects("unblockKey").returns(data);
            return expect(key.unblockKey()).to.equal(data);
        });
    })

    describe('deleteKey', () => {
        it('should delete a key', () => {
            const key = new Key();
            const mockDb = mock(key.database);
            const data = {
                message: "Key Purged"
            }
            mockDb.expects("deleteKey").returns(data);
            return expect(key.deleteKey()).to.equal(data);
        });
    })

    describe('keepAliveKey', () => {
        it('should update the key time', () => {
            const key = new Key();
            const mockDb = mock(key.database);
            const data = {
                message: "Key Kept Alive"
            }
            mockDb.expects("keepAliveKey").returns(data);
            return expect(key.keepAliveKey()).to.equal(data);
        });
    })

    describe('purgeSLAPassedKeys', () => {
        const key = new Key();
        const mockDb = mock(key.database);
        it('should purge the unused key', () => {
            const data = null
            mockDb.expects("purgeSLAPassedKeys").returns(data);
            return expect(key.purgeSLAPassedKeys()).to.equal(data);
        });
    })
})