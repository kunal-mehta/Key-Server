const keyController = require('../controller/key'); 
const key = new keyController();
const generateKey = async (event) => {
    return key.generateKey()
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
    })
}

const allocateKey = async (event) => {
    return key.allocateKey()
        .then(data => {
            if (data.length)
                return {
                    statusCode: 200,
                    body: JSON.stringify(data[0])
                }
        
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'No keys available for now'
                })
            }
        })
}

const unblockKey = async (event) => {
    return key.unblockKey(event.pathParameters.keyId)
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
    })
}

const deleteKey = async (event) => {
    return key.deleteKey(event.pathParameters.keyId)
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
    })
}

const keepAliveKey = async (event) => {
    return key.keepAliveKey(event.pathParameters.keyId)
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
    })
}

const purgeSLAPassedKeys = async(event) => {
    return key.purgeSLAPassedKeys()
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
    })
}

module.exports = {
    generateKey: generateKey,
    allocateKey: allocateKey,
    unblockKey: unblockKey,
    deleteKey: deleteKey,
    keepAliveKey: keepAliveKey,
    purgeSLAPassedKeys: purgeSLAPassedKeys,
    key: key,
}