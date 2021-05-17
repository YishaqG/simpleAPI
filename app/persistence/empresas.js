const encrypt = require('../util/encrypt');
const db = require('../persistence/dbConnection');

async function create(info)
{
    let client = await db.getConnection();
    return new Promise((resolve, reject) => {
        client.query('INSERT INTO empresas (nombre_legal, nombre_comercial, rfc, telefono) VALUES ($1, $2, $3, $4)',
        [info.nombre_legal, info.nombre_comercial, info.rfc, info.telefono],
        err => {
            if (err) reject(err);
            resolve();
            client.end();
        });
    });
}

async function getAll()
{
    let client = await db.getConnection();
    return new Promise((resolve, reject) => {
        client.query('SELECT * FROM empresas', (err, result) => {
            if (err) reject(err);
            resolve(result.rows);
            client.end();
        });
    });
}

async function update(id, info)
{
    let client = await db.getConnection();
    return new Promise((resolve, reject) => {
        client.query('UPDATE empresas SET nombre_legal=$1, nombre_comercial=$2, rfc=$3, telefono=$4 WHERE id=$5',
        [info.nombre_legal, info.nombre_comercial, info.rfc, info.telefono, id],
        err => {
            if (err) reject(err);
            resolve();
            client.end();
        });
    });
}

async function remove(id)
{
    let client = await db.getConnection();
    return new Promise((resolve, reject) => {
        client.query('DELETE FROM empresas WHERE id=$1',
        [id],
        err => {
            if (err) reject(err);
            resolve();
            client.end();
        });
    });
}

module.exports = {
    create,
    getAll,
    update,
    remove,
};