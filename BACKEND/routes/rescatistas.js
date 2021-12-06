"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../app/data_handler');
const Mascotas = require('../app/schemas/schemaMascotas');
router.route('/')
    .post(async (req, res) => {
        let new_pet = req.body;
        console.log(new_pet);
        const pet = new Mascotas(new_pet);
        await pet.save();
        //como manda excepcion haremos un try
        try{
            dataHandler.createPet(new_pet);
            res.status(200)
                .set('Content-Type', 'text/plain; charset=utf-8')
                .send(`Mascota ${new_pet._nombre} was created!`);
        }catch(e){
            res.status(400).send(e.errorMessage);
        }
    });

router.route('/:idPet')
    .put(async (req, res) =>{
        let idPet = req.params.idPet;
        let pet = req.body;
        let petById = await Mascotas.findOneAndUpdate({_id: idPet}, pet)
        if(petById == null){
            res.status(404)
            .type('text/plain; charset=utf-8')
            .send('Error, la mascota con el idPet '+idPet+" no existe");
        }else{
            //dataHandler.updatePet(idPet, pet);
            res.status(200)
                .type('text/plain; charset=utf-8')
                .send('La mascota con el idPet '+idPet+" ha sifo actualizada");
        }
      });

router.route('/:idPet')
    .delete(async (req, res) =>{
        let idPet = req.params.idPet;
        let petById = await Mascotas.findOneAndDelete({_id: idPet})
        if(petById == null){
            res.status(404)
            .type('text/plain; charset=utf-8')
            .send('Error, la mascota con el idPet '+idPet+" no existe");
        }else{
            res.status(200)
                .type('text/plain; charset=utf-8')
                .send(`Mascota ${idPet} was deleted!`);
        }
    });
module.exports = router;