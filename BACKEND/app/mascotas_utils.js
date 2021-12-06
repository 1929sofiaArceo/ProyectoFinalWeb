"use strict";

let petContainer = document.getElementById("cardsMascotas");
function petToHTML(pet) {
    return `
    <div class="card" style="width: 20rem; height:fit-content; border: 1px solid black; text-align: center;">
        <span class="d-none">${pet._idPet}</span>
        <img class="card-img-top" src="${pet._image}" alt="JackImage" height="220px">
        <div class="card-body">
            <p class="card-text">
            <img src="/Users/davidarceo/Desktop/DASW/ProyectoFinal/dog-solid.svg" width="40px" class="iconCard">  
            <h4>Soy ${pet._nombre}
                <button onclick = "displayPets('${pet._idPet}')" class="button button5">+ Info</button>
            </h4>
            </p>
        </div>
    </div>
    `
}
function petListToHtml(petList){
    petContainer.innerHTML = '<div class="row">\n' + petList.map(petToHTML).join("\n") + '\n</div>';
}

petListToHtml(mascotas);

let petCont = document.getElementById("mainPetPrueba");

//let petCont = document.getElementById("mainPet");
function displayPets(idPet){
    let index = mascotas.findIndex(mascota => mascota._idPet === idPet);
    //window.location.href = "Pet.html";
    petToHtml(index);
}


//Hacemos el display segun el pet elegido
function loadPetHTML(indexPet){
    return `
    <table>
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
                <button type="button" onclick= "displayAdoptar()" class="btn btn-info btn-lg" style="margin: 10px; width: fit-content; size: 2rem;">
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
        <tr style="background-color: rgba(181, 223, 236, 0.8); border: 2px solid black;">
            <td id="adoptar" style="display: none;">
            Adoptar
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
    document.getElementById("adoptar").style.display = 'none';
}
function displayExpediente(){
    document.getElementById("vacunas").style.display = 'none';
    document.getElementById("expediente").style.display = 'block';
    document.getElementById("adoptar").style.display = 'none';
}
function displayAdoptar(){
    document.getElementById("vacunas").style.display = 'none';
    document.getElementById("expediente").style.display = 'none';
    document.getElementById("adoptar").style.display = 'block';

}

function find(){
    let arrayParams = [];
    arrayParams.push(document.getElementById("size").value.toUpperCase());
    arrayParams.push(document.getElementById("raza").value.toUpperCase());
    arrayParams.push(document.getElementById("sex").value);
    arrayParams.push(document.getElementById("edad").value);
    console.log("PARAMS: ");
    console.log(arrayParams);
    findPet(arrayParams);
    petListToHtml(mascotasMatch)
}