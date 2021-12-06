"use strict";

async function loadMascotas(url){
    try{
        let response = await fetch(url);
        return response.json();
    }catch(e){
        console.log("error");
    }
}

function storePet(url, pet, onSuccess, onError){
    //Haremos el POST XHR a la ruta localhost:3000/rescatistas/mascotas con body = pet
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(pet));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function putPet(url, pet, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(pet));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function deletePet(url, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.send();
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

//creamos function para verificar status del xhrRespoonse
function getXhrResponse(xhr, onSucces, onError){
    if(xhr.status == 200){
        onSucces(xhr.responseText);
    }else{
        onError(xhr.responseText);
    }
}
