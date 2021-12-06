"use strict";

const mascotasUrl = "http://localhost:3000/mascotas/";
const petUrl = "http://localhost:3000/pet/";
const rescatistasUrl = "http://localhost:3000/rescatistas/mascotas/";

function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=> {
        let r = Math.random()*16|0;
        let v = c == 'x'? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
/*
function initPets(){
    if (sessionStorage.getItem('petsIds') == null) {
        let pets = [];
        writePets(pets);
    }
    else {
        let pets = JSON.parse(sessionStorage.getItem('petsIds'));
        writePets(pets);
    }
}

function readPets(){
    let pets = JSON.parse(sessionStorage.getItem('petsIds'));
    return pets;
}

function writePets(id){
    sessionStorage.setItem('petsIds', id);
}
initPets();
*/
