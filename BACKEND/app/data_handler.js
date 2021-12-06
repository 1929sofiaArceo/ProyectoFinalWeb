"use strict";

const fs = require('fs');
const Mascota = require('./mascotas');
let content = fs.readFileSync('./app/data/mascotas.json');
const mascotas = JSON.parse(content).map(Mascota.createFromObject);
fs.writeFileSync('./app/data/mascotas.json', JSON.stringify(mascotas));
console.log(mascotas);
//CRUD

//------------MASCOTAS---------------//

//-----------CREATE--------//
function createPet(pet){
    if(typeof(pet) === 'string'){
        mascotas.push(Mascota.createFromJSON(pet));
        fs.writeFileSync('./app/data/mascotas.json', JSON.stringify(mascotas));
    }else{
        console.log("pass");
        mascotas.push(Mascota.createFromObject(pet));
        fs.writeFileSync('./app/data/mascotas.json', JSON.stringify(mascotas));
    }
}
//-----------READ--------//
function getPets(){
    return mascotas;
}
function getPetById(id){
    let index = mascotas.findIndex(mascota => mascota.idPet === id);
    if(index == -1){
        return;
    }else{
        return mascotas[index];
    }
}
//-----------UPDATE--------//
function updatePet(id, updatedPet){
    let index = mascotas.findIndex(pet => pet.idPet === id);
    if(index < 0) return; // no existe la mascota
    Object.assign(mascotas[index], updatedPet);
    fs.writeFileSync('./app/data/mascotas.json', JSON.stringify(mascotas));
}
//-----------DELETE--------//
function deletePet(id){
    let index = mascotas.findIndex(pet => pet.idPet === id);
    if(index == -1) return; // no existe el uuid
    mascotas.splice(index, 1)[0];
    fs.writeFileSync('./app/data/mascotas.json', JSON.stringify(mascotas));
}
//-------FILTRAR MASCOTA--------//
let mascotasMatch = [];
function getPetsMatch(){
    return mascotasMatch;
}
function findPet(arrayParams){
    //limpiamos el array de mascotasMatch
    let mascotasMatch = [];
    let size = arrayParams[0];
    let raza = arrayParams[1];
    let genero = arrayParams[2];
    let range = arrayParams[3];
    let edad = range.split('-');
    for(let i=0; i<mascotas.length; i++){
        if(mascotas[i]._size.toUpperCase() == size && mascotas[i]._raza.toUpperCase() == raza && mascotas[i]._genero == genero){
            if(edad.length == 1){
                //si eligio 8+
                if(mascotas[i]._edad >= 8){
                    mascotasMatch.push(mascotas[i]);
                }
            }else{
                if(mascotas[i]._edad >= Number(edad[0]) && mascotas[i]._edad <= Number(edad[1])){
                    mascotasMatch.push(mascotas[i]);
                }
            }
        }
    }
}

//-----------------RESCATISTA---------------//
const Rescatista = require('./Rescatistas');
let content_rescatistas = fs.readFileSync('./app/data/rescatistas.json');
const rescatistas = JSON.parse(content_rescatistas).map(Rescatista.createFromObject);
//CRUD

//-----------CREATE--------//
function createRescatista(resc){
    if(typeof(rescatista) === 'string'){
        rescatistas.push(Rescatista.createFromJSON(resc));
        fs.writeFileSync('./app/data/rescatistas.json', JSON.stringify(rescatistas));
    }else{
        rescatistas.push(Rescatista.createFromObject(resc));
        fs.writeFileSync('./app/data/rescatistas.json', JSON.stringify(rescatistas));
    }
}
//-----------READ--------//
function getRescatistas(){
    return rescatistas;
}
function getRescatistaById(id){
    let index = rescatistas.findIndex(rescatista => rescatista.idRescatista === id);
    if(index == -1){
        return;
    }else{
        return rescatistas[index];
    }
}
//-----------UPDATE--------//
function updateRescatista(id, updatedResc){
    let index = rescatistas.findIndex(resc => resc.idRescatista === id);
    if(index < 0) return; // no existe la mascota
    Object.assign(rescatistas[index], updatedResc);
    fs.writeFileSync('./app/data/rescatistas.json', JSON.stringify(rescatistas));
}
//-----------DELETE--------//
function deleteRescatista(id){
    let index = rescatistas.findIndex(resc => resc.idRescatista === id);
    if(index == -1) return; // no existe el uuid
    rescatistas.splice(index, 1)[0];
    fs.writeFileSync('./app/data/rescatistas.json', JSON.stringify(rescatistas));
}

//mascotas
exports.createPet = createPet;
exports.getPets = getPets;
exports.getPetById = getPetById;
exports.updatePet = updatePet;
exports.deletePet = deletePet;
exports.findPet = findPet;
exports.getPetsMatch = getPetsMatch;
//rescatistas
exports.createRescatista = createRescatista;
exports.getRescatistas = getRescatistas;
exports.getRescatistaById = getRescatistaById;
exports.updateRescatista = updateRescatista;
exports.deleteRescatista = deleteRescatista;