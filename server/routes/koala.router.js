const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM "koalas" 
        ORDER BY "name";
    `;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error getting koalas in router.get', error);
        });
});

// POST
koalaRouter.post('/', (req, res) => {
    const sqlQuery = `
        INSERT INTO "koalas" 
            ("name", "age", "color", "readyToTransfer", "notes") 
        VALUES 
            ($1, $2, $3, $4, $5)
    `;
    const sqlParams = [
        req.body.name,
        req.body.age,
        req.body.color,
        req.body.readyForTransfer,
        req.body.notes
    ];

    pool.query(sqlQuery, sqlParams)
        .then((result) => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);

            res.sendStatus(500);
        });
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    const koalaId = req.params.id;
    console.log(`PUT /${koalaId}`, req.body);

    const sqlQuery = `
        UPDATE "koalas" 
        SET "readyToTransfer"=$2
        WHERE "id"=$1;
    `;
    const sqlParams = [koalaId, req.body.readyToTransfer];

    pool.query(sqlQuery, sqlParams)
        .then(response => {
            console.log(`PUT /koalas/${koalaId} succeeded!`);
        })
        .catch(err => {
            console.log('PUT /koalas/:id failed', err);
            res.sendStatus(500);
        });
});

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    const koalaId = req.params.id;
    const sqlQuery = `
        DELETE FROM koalas
        WHERE "id"=$1;
    `;

    pool.query(sqlQuery, [koalaId])
        .then((response) => {
            console.log(`we deleted the koala with id ${koalaId}`);
            res.send(200);
        }).catch((err) => {
            console.log('something went wrong in koalaRouter.delete', err);
            res.sendStatus(500)
        });
});

module.exports = koalaRouter;
