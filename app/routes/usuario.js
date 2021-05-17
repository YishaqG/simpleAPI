const router = require("express").Router();
const usuarios = require('../persistence/usuarios');

router.post('/usuario', async (req, res) => {
    usuarios.create(req.body).then( () => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

router.get('/usuario', async (req, res) =>{
    usuarios.getAll().then(rows => {
        res.send(rows);
    }).catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

router.put('/usuario/:id', async (req, res) =>{
    usuarios.update(req.params.id, req.body)
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

router.delete('/usuario/:id', async (req, res) =>{
    usuarios.remove(req.params.id)
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

module.exports = router;