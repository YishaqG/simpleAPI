const fs = require("fs");
const { resolve } = require("path");
const {Pool} = require('pg');
const { init } = require("../scripts/seedDB");

const {
    DB_HOST: host,
    DB_USER: user,
    DB_PASSWORD: password,
    DB_NAME: database,
} = process.env;

let pool;

function initPool() {
    return new Promise((resolve, reject)=>{
        pool = new Pool({
            connectionLimit: 5,
            host,
            user,
            password,
            database,
        });
        pool.connect().then(client => {
            console.log('Successful connection to database.');
            client.end();
            resolve();
        }).catch(error => {
            reject(error);
        });
    });
}

function loadSchema()
{
    return new Promise((resolve, reject) => {
        let schema = fs.readFileSync('./persistence/schema.sql').toString();
        pool.query(schema,
            err => {
                if (err) return reject(err);
                resolve();
            },
        );
    });
}

async function teardown() {
    return new Promise((resolve, reject) => {
        pool.end(err => {
            if (err) {
                reject(err);
            } 
            else {
                console.log("Database connection closed.");
                resolve();
            } 
        });
    });
}

function getConnection() {
    return new Promise((resolve, reject)=>{
        if (!pool) initPool();

        pool.connect().then(client => {
            resolve(client);
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    initPool,
    loadSchema,
    teardown,
    getConnection,
};
