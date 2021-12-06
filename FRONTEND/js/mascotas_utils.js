"use strict";

let petContainer = document.getElementById("cardsMascotas");
let mascotasList = [];

console.log(document.getElementById("addMascota"));
function petToHTML(pet) {
    return `
    <div class="card" style="width: 20rem; height:fit-content; border: 1px solid black; text-align: center;">
        <span class="d-none">${pet._id}</span>
        <img class="card-img-top" src="${pet._image}" alt="dogImage" height="220px">
        <div class="card-body">
            <p class="card-text">
            <img src="http://cdn.onlinewebfonts.com/svg/img_233291.png" width="40px" class="iconCard">  
            <h4>Soy ${pet._nombre}
                <button onclick = "displayPets('${pet._id}')" class="button button5">+ Info</button>
            </h4>
            </p>
        </div>
            <button onclick = "updatePet('${pet._id}')" class="btn btn-warning" id="editPetButton" style="display:none;" data-toggle="modal" data-target="#modalUpdate">
            <img src="https://icon-library.com/images/edit-icon-png/edit-icon-png-0.jpg" style="width: 25px;">
            Edit Here</button>
            <button onclick = "removePet('${pet._id}')" class="btn btn-danger" id="deletePetButton" style="display:none;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Trash_font_awesome.svg/1200px-Trash_font_awesome.svg.png" style="width: 25px;">
            </button>
    </div>
    `
}
function petListToHtml(petList){
    petContainer.innerHTML = '<div class="row">\n' + petList.map(petToHTML).join("\n") + '\n</div>';
}
function displayMascotas(){
    //metemos todo a una funcion para poder llamarla cuando agreguemos mas mascotas
    loadMascotas(mascotasUrl).then(mascotas =>{
        petListToHtml(mascotas);
        mascotasList = mascotas;
        //console.log(mascotasList[0]);
    });
}
displayMascotas();

let sofi = new Mascota("Sofi", "M", "image.jpg", "Perro", "Golden", "Grande", "Todas", 19, "Si", "No", "Sofi.pdf");

function displayPets(idPet){
    localStorage.setItem("idPet", idPet);
    localStorage.setItem("mascotas", JSON.stringify(mascotasList));
    window.location.href = "/pet";
}

function addPet(pet){
    //funcion para añadir una nueva mascota y guardarla en nuestro servidor
    storePet(rescatistasUrl, pet, msj => {
        console.log(msj);
        displayMascotas();
    }, err => console.log(err))
}

let mascotasMatch = [];

function find(){
    let arrayParams = [];
    arrayParams.push(document.getElementById("size").value.toUpperCase());
    arrayParams.push(document.getElementById("raza").value.toUpperCase());
    arrayParams.push(document.getElementById("sex").value);
    arrayParams.push(document.getElementById("edad").value);
    findPet(arrayParams);
}

function findPet(arrayParams){
    //limpiamos el array de mascotasMatch
    let mascotasMatch = [];
    let size = arrayParams[0].toUpperCase();
    let raza = arrayParams[1].toUpperCase();
    let genero = arrayParams[2].toUpperCase();
    let range = arrayParams[3];
    let edad = (range == "Todos"? "TODOS": range.split('-'));
    console.log(arrayParams);
    console.table(mascotasList);
    if(size == 'TODOS' && raza == 'TODOS' && genero == 'TODOS' && edad == 'TODOS'){
        petListToHtml(mascotasList);
        return;
    }
    for(let i=0; i<mascotasList.length; i++){
        if(size == 'TODOS' && raza != 'TODOS' && genero != 'TODOS' && edad != 'TODOS'){
            console.log("only size");
            if(mascotasList[i]._raza.toUpperCase() == raza && mascotasList[i]._genero == genero){
                if(edad.length == 1){
                    //si eligio 8+
                    if(mascotasList[i]._edad >= 8){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }else{
                    if(mascotasList[i]._edad >= Number(edad[0]) && mascotasList[i]._edad <= Number(edad[1])){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }
            }
        }else if(size != 'TODOS' && raza == 'TODOS' && genero != 'TODOS' && edad != 'TODOS'){
            console.log("only raza");
            if(mascotasList[i]._size.toUpperCase() == size && mascotasList[i]._genero == genero){
                if(edad.length == 1){
                    //si eligio 8+
                    if(mascotasList[i]._edad >= 8){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }else{
                    if(mascotasList[i]._edad >= Number(edad[0]) && mascotasList[i]._edad <= Number(edad[1])){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }
            }
        }else if(size != 'TODOS' && raza != 'TODOS' && genero == 'TODOS' && edad != 'TODOS'){
            console.log("only genero");
            if(mascotasList[i]._size.toUpperCase() == size && mascotasList[i]._raza.toUpperCase() == raza){
                if(edad.length == 1){
                    //si eligio 8+
                    if(mascotasList[i]._edad >= 8){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }else{
                    if(mascotasList[i]._edad >= Number(edad[0]) && mascotasList[i]._edad <= Number(edad[1])){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }
            }
        }else if(size != 'TODOS' && raza != 'TODOS' && genero != 'TODOS' && edad == 'TODOS'){
            if(mascotasList[i]._size.toUpperCase() == size && mascotasList[i]._raza.toUpperCase() == raza && mascotasList[i]._genero == genero){
                mascotasMatch.push(mascotasList[i]);
            }
        }else if(size == 'TODOS' && raza == 'TODOS' && genero != 'TODOS' && edad != 'TODOS'){
            if(mascotasList[i]._genero == genero){
                if(edad.length == 1){
                    //si eligio 8+
                    if(mascotasList[i]._edad >= 8){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }else{
                    if(mascotasList[i]._edad >= Number(edad[0]) && mascotasList[i]._edad <= Number(edad[1])){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }
            }
        }
        else if(size != 'TODOS' && raza != 'TODOS' && genero == 'TODOS' && edad == 'TODOS'){
            if(mascotasList[i]._size == size && mascotasList[i]._raza == raza){
                mascotasMatch.push(mascotasList[i]);
            }
        }
        else{
            if(mascotasList[i]._size.toUpperCase() == size && mascotasList[i]._raza.toUpperCase() == raza && mascotasList[i]._genero == genero){
                if(edad.length == 1){
                    //si eligio 8+
                    if(mascotasList[i]._edad >= 8){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }else{
                    if(mascotasList[i]._edad >= Number(edad[0]) && mascotasList[i]._edad <= Number(edad[1])){
                        mascotasMatch.push(mascotasList[i]);
                    }
                }
            }
        }
    }
    console.log(mascotasMatch);
    if(mascotasMatch.length== 0){
        console.log("PASS");
        $('#notMatch').modal('show');
        petListToHtml(mascotasList);
    }else{
        petListToHtml(mascotasMatch);
    }
}

function dropFilters(){
    document.getElementById("size").value = 'Todos';
    document.getElementById("raza").value= 'Todos';
    document.getElementById("sex").value = 'Todos';
    document.getElementById("edad").value = 'Todos';
    petListToHtml(mascotasList);
}

function readDataPet(){
    var name = document.getElementById("namePet").value;
    var gender  = $('input[name="sexPet"]:checked').val();
    var image = document.getElementById("imagePet").value;
    var especie = document.getElementById("especiePet").value;
    var raza = document.getElementById("razaPet").value;
    var size = $('input[name="sizePet"]:checked').val();
    var vacunas = document.getElementById("vacunasPet").value;
    var edad = Number(document.getElementById("edadPet").value);
    var desp =  $('input[name="desparasitadoPet"]:checked').val();
    var est = $('input[name="esterilizadoPet"]:checked').val();
    var exp = document.getElementById("expedientePet").value;
    let pet = new Mascota(name, gender, image, especie, raza, size, vacunas, edad, desp, est, exp);
    addPet(pet);
    $('#mascotaAñadida').modal('show');
}

function updatePet(idPet){
    preloadUpdateModal(idPet);
}

function editPets(){
    let list = document.querySelectorAll('#editPetButton');
    list.forEach(function(button){
        button.style.display = 'block';
    })
    let list2 = document.querySelectorAll('#deletePetButton');
    list2.forEach(function(button){
        button.style.display = 'block';
    }) 
}

function updateDataPet(){
    //Leemos datos y los actualizamos
    console.log("saveUpdate");
    let jsonObj = {
    "_nombre": document.getElementById("updatenamePet").value,
    "_image": document.getElementById("updateimagePet").value,
    "_especie": document.getElementById("updateespeciePet").value,
    "_size": $('input[name="updatesizePet"]:checked').val(),
    "_vacunas": document.getElementById("updatevacunasPet").value,
    "_edad": Number(document.getElementById("updateedadPet").value),
    "_desparasitado": $('input[name="updatedesparasitadoPet"]:checked').val(),
    "_esterilizado": $('input[name="updateesterilizadoPet"]:checked').val(),
    "_expediente": document.getElementById("updateexpedientePet").value};
    console.log(idPetUpdate);
    displayMascotas();
    putPet(rescatistasUrl + idPetUpdate, jsonObj, (msg) => console.log(msg), (err) => console.log(err));
}

let idPetUpdate = "";
function preloadUpdateModal(idPet){
    idPetUpdate = idPet;
    let index = mascotasList.findIndex(mascota => mascota._id === idPet);
    console.log(mascotasList[index]);

    document.getElementById("updatenamePet").value = mascotasList[index]._nombre;
    document.getElementById("updateedadPet").value = mascotasList[index]._edad;
    document.getElementById("updateespeciePet").value = mascotasList[index]._especie;
    document.getElementById("updateimagePet").value = mascotasList[index]._image;
    console.log(mascotasList[index]._size);
    if(mascotasList[index]._size == "Chico"){
        $('input[name="updatesizePet"][value="Chico"]').prop('checked', 'checked');
    }else if(mascotasList[index]._size == 'Mediano'){
        $('input[name="updatesizePet"][value="Mediano"]').prop('checked', 'checked');
    }else{
        $('input[name="updatesizePet"][value="Grande"]').prop('checked', 'checked');
    }
    document.getElementById("updatevacunasPet").value = mascotasList[index]._vacunas;
    if(mascotasList[index]._desparasitado == 'Si'){
        $('input[name="updatedesparasitadoPet"][value="Si"]').prop('checked', 'checked');
    }else{
        $('input[name="updatedesparasitadoPet"][value="No"]').prop('checked', 'checked');
    }
    //como el expediente no es obligatoria vemos que si hay o no.
    document.getElementById("updateexpedientePet").value == undefined ? "": mascotasList[index]._expediente;
    if(mascotasList[index]._esterilizado == 'Si'){
        $('input[name="updateesterilizadoPet"][value="Si"]').prop('checked', 'checked');
    }else{
        $('input[name="updateesterilizadoPet"][value="No"]').prop('checked', 'checked');
    }
}

let idRemovePet = "";
function removePet(idPet){
    $('#warningDelete').modal('show');
    idRemovePet = idPet;
}
function yesDelete(){
    deletePet(rescatistasUrl + idRemovePet, (msg) => console.log(msg), (err) => console.log(err));
    displayMascotas();
    $('#mascotaEliminada').modal('show');
    displayMascotas();
}

function openHome(){
    window.location.href = "/home";
}