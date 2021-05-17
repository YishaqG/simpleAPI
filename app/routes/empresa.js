const router = require("express").Router();
const empresas = require('../persistence/empresas');

router.post('/empresa',async (req, res) =>{
    empresas.create(req.body)
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

router.get('/empresa', async (req, res) =>{
    empresas.getAll()
    .then( rows => {
        res.send(rows);
    }).catch(err => {
        console.log(err);
    });
});

router.put('/empresa/:id', async (req, res) =>{
    empresas.update(req.params.id, req.body)
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
});

router.delete('/empresa/:id',async (req, res) =>{
    empresas.remove(req.params.id)
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

module.exports = router;