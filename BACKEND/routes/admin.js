"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../app/data_handler');

router.route('/')
    .get((req, res) =>{
        let query = req.query.filter;
        if(query == undefined){
            res.status(200).json(dataHandler.getRescatistas());
        }else{
            res.status(400).send('Error');
        }
    });

router.route('/:idRescatista')
    .get((req, res) =>{
        let idRescatista = req.params.idRescatista;
        if(dataHandler.getRescatistaById(idRescatista) == undefined){
            res.status(404)
            .type('text/plain; charset=utf-8')
            .send('Error, el rescatista con el idRescatista '+idRescatista+" no existe");
        }else{
            res.status(200).json(dataHandler.getRescatistaById(idRescatista));
        }
    });

router.route('/')
    .post((req, res) => {
        let new_rescatista = req.body;
        //como manda excepcion haremos un try
        try{
            dataHandler.createRescatista(new_rescatista);
            res.status(201)
                .set('Content-Type', 'text/plain; charset=utf-8')
                .send(`Product ${new_rescatista._nombre} was created!`);
        }catch(e){
            res.status(400).send(e.errorMessage);
        }
    });

router.route('/:idRescatista')
    .put((req, res) =>{
        let idRescatista = req.params.idRescatista;
        let resc = req.body;
        if(dataHandler.getRescatistaById(idRescatista) == undefined){
            res.status(404)
            .type('text/plain; charset=utf-8')
            .send('Error, el rescatista con el idRescatista '+idRescatista+" no existe");
        }else{
            dataHandler.updateRescatista(idRescatista, resc);
            res.status(200)
                .type('text/plain; charset=utf-8')
                .send(`Rescatista ${idRescatista} was updated!`);
        }
      });

router.route('/:idRescatista')
    .delete((req, res) =>{
        let idRescatista = req.params.idRescatista;
        if(dataHandler.getRescatistaById(idRescatista) == undefined){
            res.status(404)
            .type('text/plain; charset=utf-8')
            .send('Error, el rescatista con el idRescatista '+idRescatista+" no existe");
        }else{
            dataHandler.deleteRescatista(idRescatista);
            res.status(200)
                .type('text/plain; charset=utf-8')
                .send(`Rescatista ${idRescatista} was deleted!`);
        }
    });
module.exports = router;
