const db = require('../persistence/dbConnection');
const faker = require('faker');
const RandExp = require('randexp');

const rolEntries = 4;
const businessEntries = 5;
const usersEntries = 10;

let client;

async function init()
{
    await db.initPool();
    client = await db.getConnection();
    await dropTables();
    console.log("Loading schema...")
    await db.loadSchema();
    await loadRols();
    await loadBusiness();
    await loadUsers();
    client.release();
}

async function dropTables()
{
    console.log("Dropping tables.")
    await client.query('DROP TABLE IF EXISTS usuarios');
    await client.query('DROP TABLE IF EXISTS roles');
    await client.query('DROP TABLE IF EXISTS empresas');   
}

async function loadRols()
{
    console.log("Loading roles.")
    await client.query(`
        INSERT INTO roles (rol)
        VALUES
        ('admin'),
        ('manager'),
        ('accounting'),
        ('employee')
    `);
}

async function loadBusiness()
{
    console.log("Loading business...")
    const empresas = require('../persistence/empresas');
    for (let i = 0; i < businessEntries; i++) {
        let info = genBusinessData();
        await empresas.create(info).catch(err=>console.log(err));;
    }
    console.log("Busimess loaded.");
}

function genBusinessData()
{
    return {
        nombre_legal: faker.company.companyName(),
        nombre_comercial: faker.company.companyName(),
        rfc: new RandExp('([A-Z]){3}([0-9]){9}([A-Z]){3}').gen(),
        telefono: faker.phone.phoneNumberFormat(),
    };
}

async function loadUsers()
{
    console.log("Loading users...");
    const usuarios = require('../persistence/usuarios');
    for (let i = 0; i < usersEntries; i++) {
        let info = genUserData();
        await usuarios.create(info).catch(err=>console.log(err));
    }
    console.log("Users loaded.");
}

function genUserData(){
    return {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        correo: faker.internet.email(),
        password: faker.internet.password(),
        rol_id: Math.floor(Math.random() * rolEntries) + 1,
        empresa_id: Math.floor(Math.random() * businessEntries) + 1,
    };
}

module.exports = {
    init,
    genBusinessData,
    genUserData,
}