"use strict";

const express = require('express');
const path = require('path');
const router = express.Router();
const mascotasRouter = require('../routes/mascotas');
const rescatistasRouter = require('../routes/rescatistas');
const adminRouter = require('../routes/admin');

router.use('/mascotas', mascotasRouter);
router.use('/rescatistas/mascotas', rescatistasRouter);
router.use('/admin/rescatistas', adminRouter);

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../FRONTEND/views/Adopciones.html'))
})

router.get('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../FRONTEND/views/Home.html'))
})

router.get('/pet', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../FRONTEND/views/Pet.html'))
})

router.get('/admin', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../FRONTEND/views/Mascotas.html'))
})

router.get('/principal', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../FRONTEND/views/Adopciones.html'))
})

module.exports = router;