"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../app/data_handler');
const Mascotas = require('../app/schemas/schemaMascotas');

router.route('/')
    .get(async (req, res) =>{
        const pet = await Mascotas.find();
        console.log(pet);
        let query = req.query.filter;
        if(query == undefined){
            res.status(200).send(pet);
        }else{
            try{
                res.status(200).json(dataHandler.findPet(query));
            }catch(e){
                res.status(400).send(e.errorMessage);
            }
        }
    });

router.route('/:idPet')
    .get(async (req, res) =>{
        let idPet = req.params.idPet;
        const pet = await Mascotas.findOne({_id: idPet});
        if(pet == null){
            res.status(404)
                .type('text/plain; charset=utf-8')
                .send('Error, la mascota con el idPet '+idPet+" no existe");
        }else{
            res.status(200).send(pet);
        }
      });
module.exports = router;