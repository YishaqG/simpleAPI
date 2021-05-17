const encrypt = require('../util/encrypt');
const db = require('../persistence/dbConnection');

async function create(info)
{
    let client = await db.getConnection();
    let hash = await encrypt.hash(info.password);
    return new Promise((resolve, reject) => {
        client.query('INSERT INTO usuarios (nombre, apellido, correo, password, rol_id, empresa_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [info.nombre, info.apellido, info.correo, hash, info.rol_id, info.empresa_id],
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
        client.query('SELECT * FROM usuarios', (err, result) => {
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
        client.query('UPDATE usuarios SET nombre=$1, apellido=$2, correo=$3 WHERE id=$4',
        [info.nombre, info.apellido, info.correo, id],
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
        client.query('DELETE FROM usuarios WHERE id=$1',
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