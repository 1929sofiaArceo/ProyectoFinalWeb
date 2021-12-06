"use strict";

let petCont = document.getElementById("mainPet");
console.log(petCont);
console.log(localStorage.getItem("idPet"));
//let objMasc = JSON.parse(localStorage.getItem("mascotas"));
//console.log(localStorage.getItem("mascotas"));
let mascotas = JSON.parse(localStorage.getItem("mascotas"));
console.log(mascotas);


window.onload = function displayPet(){
    let index = mascotas.findIndex(mascota => mascota._id === localStorage.getItem("idPet"));
    petToHtml(index);
}

//Hacemos el display segun el pet elegido
function loadPetHTML(indexPet){
    return `
    <table style="text-align: center;">
        <th>
            <p id="namePet">${mascotas[indexPet]._nombre}</p>
            <hr>
            <img src="${mascotas[indexPet]._image}"  class="rounded-circle" alt="Pet" width="600px">
            <hr>
        </th>
        <tr>
            <td>
                <button type="button" onclick= "displayVacunas()" class="btn btn-info btn-lg">
                Vacunas
                </button>
                <button type="button" onclick= "displayExpediente()" class="btn btn-info btn-lg">
                    Expediente
                </button>

                <button type="button" data-toggle="modal" data-target="#modalAdoptar"  class="btn btn-info btn-lg" style="margin: 10px; width: fit-content; size: 2rem;">
                    Adoptar
                </button>
            </td>
        </tr>
        <tr style="background-color: rgba(181, 223, 236, 0.8); border: 2px solid black;">
            <td id="vacunas" style="display: none;">
            <h4>
            <img src="https://socoemergency.org/wp-content/uploads/2020/11/icon-vaccine.png" style="width: 50px;">
                ${mascotas[indexPet]._vacunas}
            </h4>
            </td>
        </tr>
        <tr style="background-color: rgba(181, 223, 236, 0.8); border: 2px solid black;">
            <td id="expediente" style="display: none;">
                <h5>Nombre: ${mascotas[indexPet]._nombre}</h5>
                <h5>Género: ${mascotas[indexPet]._genero}</h5>
                <h5>Especie: ${mascotas[indexPet]._especie}</h5>
                <h5>Raza: ${mascotas[indexPet]._raza}</h5>
                <h5>Tamaño: ${mascotas[indexPet]._size}</h5>
                <h5>Esterilizado: ${mascotas[indexPet]._esterilizado}</h5>
                <h5>Desparasitado: ${mascotas[indexPet]._desparasitado}</h5>
            </td>
        </tr>
    </table>
    `
}
function petToHtml(pet){
    petCont.innerHTML = '<div class="divTable">\n' + loadPetHTML(pet) + '\n</div>';
}
//---------Display Botones-------//
function displayVacunas(){
    document.getElementById("vacunas").style.display = 'block';
    document.getElementById("expediente").style.display = 'none';
}
function displayExpediente(){
    document.getElementById("vacunas").style.display = 'none';
    document.getElementById("expediente").style.display = 'block';
}
function displayAdoptar(){
    document.getElementById("vacunas").style.display = 'none';
    document.getElementById("expediente").style.display = 'none';
}