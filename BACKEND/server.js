"use strict";

const express = require('express');
const app = express();
const port = 3000;
const router = require('./app/router');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
app.use(router);
const REMOTEDB="mongodb+srv://sysdba:sysdba@cluster0.fq3vo.mongodb.net/myFirstDatabase?"

app.use("/FRONTEND/js", express.static('../FRONTEND/js'));

mongoose.connect(REMOTEDB).then(()=>{
    console.log("Concetado a la base de datos");
}).catch((error)=>{
    console.log("Not conected to db");
});

app.listen(port, ()=>{
    console.log('Listening on port '+port);
});
