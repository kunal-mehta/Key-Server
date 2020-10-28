const mysql = require ('promise-mysql');
const uuid = require('uuid');
const luxon  = require("luxon");
const dateTime = luxon.DateTime;

class Database {

    constructor(){
        this.connection = null;
        this.createConnection();
    }

    createConnection(){
        if(!this.connection){
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'keyserver'
            });
        }
    }

  async generateKey(){
    return this.connection
        .then(connection => connection.query(`INSERT INTO keystore (keyid, isdelete) VALUES ('${uuid.v4()}', false);`))
        .then(() => {
            return {
                message: "Key Generated"
            }
        })  
    }

    async allocateKey(){
        let date = new Date();
        date = date.toISOString().replace("T", " ").replace("Z", "");
        let connectionLive = null;
        let response = null;
        return this.connection
            .then(connection => {
                connectionLive = connection;
                return connection.query(`SELECT keyid from keystore where lastused is null limit 1`);
            })
            .then((data) => {
                response = data;
                if(data && data.length > 0){
                    const keyId = data[0].keyid;
                    return connectionLive.query(`UPDATE keystore SET lastused = '${date}' WHERE keyid = '${keyId}'`)
                }else{
                    response = [];
                    return;
                }
            })
            .then(() => response);
                
    }

    unblockKey(keyId){
        return this.connection
            .then(connection => connection.query(`UPDATE keystore SET lastused = NULL WHERE keyid = '${keyId}' AND isdelete = false`))
            .then(() => {
                return {
                    message: "Key Released"
                }
            })  
    }

    deleteKey(keyId){
        return this.connection
            .then(connection => connection.query(`DELETE from keystore WHERE keyid = '${keyId}'`))
            .then(() => {
                return {
                    message: "Key Purged"
                }
            })  
    }

    keepAliveKey(keyId){
        let date = new Date();
        date = date.toISOString().replace("T", " ").replace("Z", "");
        return this.connection
        .then(connection => connection.query(`UPDATE keystore SET lastused = '${date}' WHERE keyid = '${keyId}' AND isdelete = false`))
        .then(() => {
            return {
                message: "Key Kept Alive"
            }
        }) 
    }

    purgeSLAPassedKeys(){
        let date = dateTime.utc().minus({minutes: 5}).toFormat("yyyy-MM-dd hh:mm:ss");
        return this.connection
            .then(connection => connection.query(`UPDATE keystore SET isdelete = true WHERE lastused < '${date}' AND isdelete = false`))
    }
}

module.exports = Database;