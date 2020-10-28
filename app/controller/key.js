const Database = require('../db/db');

class Key{
    constructor(){
        this.database = new Database();
    }

    generateKey(){
        return this.database.generateKey();
    }

    allocateKey(){
        return this.database.allocateKey();
    }

    unblockKey(keyId){
        return this.database.unblockKey(keyId);
    }

    deleteKey(keyId){
        return this.database.deleteKey(keyId);
    }

    keepAliveKey(keyId){
        return this.database.keepAliveKey(keyId);
    }

    purgeSLAPassedKeys(){
        return this.database.purgeSLAPassedKeys();
    }
}   

module.exports = Key;