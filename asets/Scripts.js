//Validacion de que el formulario no tenga campos vaciosen donde se le asigno una alerta especifica.

function Validar(){
var Nombre = document.getElementById("NameFilm").value;
var Año = document.getElementById("Year").value;
var Categoria = document.getElementById("Category").value;
var Actor = document.getElementById("People").value;

if(Nombre == ""){
alert("Complete el nombre");
return false;


}
if(Año == ""){
alert("Complete el año de estreno, recuerde que solo peliculas a partir de 1895");
return false;

}
if(Categoria == ""){
alert("Complete el genero de la pelicula");
return false;

}

if(Actor == ""){
   alert("complete con un actor")
    return false;
}

return true;

}
//funcion mostrar los datos que se hayan ingresado ddel localstorage
function VerDatos(){
    //se declara listFilm para que sea el arreglo guardado dentro del localstorage y se utiliza al igual que en todas las funciones el uso del if para el llamado del arreglo con el getItem 
var listFilm ;
if(localStorage.getItem("listFilm") == null){
listFilm = [];

}else{

listFilm = JSON.parse(localStorage.getItem("listFilm"));

}
var html = "";
// Ya llamados los elemetos  se utiliza el forEach para el presentar todos los elemntos del arreglo con cierto formato
listFilm.forEach(function(element, index){
    html += '<tr id="Pelicula">';
    html += "<td>"+element.Nombre+"</td>";
    html += "<td>"+element.Año+"</td>";
    html += "<td>"+element.Categoria+"</td>";
    html += "<td>"+element.Actor+"</td>";
    html += '<td><a href="#" class="btn m-1  btn-warning edit"  id="edit" onclick="Actualizar('+ index +')">Editar</a><a href="#" class="btn m-1 btn-danger delete" id="delete" onclick="Elimina('+ index +')">Eliminar</a></td>';
    
    html+="</tr>";



});
document.querySelector("#Peli-list").innerHTML = html;

}
//ocupamos el onload para que carguen los datos en dentro de la funcion ver datos asi mismo haciendo la conexion con esta misma.
document.onload = VerDatos();
//Guarda los datos primerpo verificando haber pasado por la verifivacion que esno esten vacios. 

function GuardarDatos(){
if(Validar() == true){
var Nombre = document.getElementById("NameFilm").value;
var Año = document.getElementById("Year").value;
var Categoria = document.getElementById("Category").value;
var Actor = document.getElementById("People").value;

var listFilm ;
if(localStorage.getItem("listFilm") == null){
listFilm = [];

}else{

listFilm = JSON.parse(localStorage.getItem("listFilm"));

}
//se guardan los datos en un arreglo en localstorage
listFilm.push({
Nombre : Nombre,
Año : Año,
Categoria : Categoria,
Actor : Actor


});
localStorage.setItem("listFilm", JSON.stringify(listFilm));
VerDatos();
document.getElementById("NameFilm").value = "";
document.getElementById("Year").value = "";
document.getElementById("Category").value = "";
document.getElementById("People").value = "";

}
}
//Funcion eliminar donde llamara la funcion al momento del onclick en  donde por el numero(index) de la lista lo encontrara y eliminara
function Elimina(index){
    var listFilm;
    if(localStorage.getItem("listFilm") == null){
        listFilm = [];
        
        }else{
        
        listFilm = JSON.parse(localStorage.getItem("listFilm"));
        
        }
        listFilm.splice(index, 1);
       localStorage.setItem('listFilm',JSON.stringify(listFilm));
       VerDatos()
   alert("Pelicula eliminada");
   

}
//Modificacion de datos de la lista en donde se hace el llamado y apareceran nuevamente en el formularion para ser modificados y guardados.

function Actualizar(index){
//console.log("Actualizando");

var listFilm;
document.getElementById('Modificar').style.display = 'block';


if(localStorage.getItem("listFilm") == null){
    listFilm = [];
    
    }else{
    
    listFilm = JSON.parse(localStorage.getItem("listFilm"));
    
    }
document.getElementById('NameFilm').value = listFilm[index].Nombre;
document.getElementById('Year').value = listFilm[index].Año;
document.getElementById('Category').value = listFilm[index].Categoria;
document.getElementById('People').value = listFilm[index].Actor;

document.querySelector("#Modificar").onclick = function(){
if(Validar() == true){

listFilm[index].Nombre = document.getElementById('NameFilm').value;
listFilm[index].Año = document.getElementById('Year').value;
listFilm[index].Categoria= document.getElementById('Category').value;
listFilm[index].Actor = document.getElementById('People').value;

localStorage.setItem('listFilm', JSON.stringify(listFilm));

GuardarDatos();
//Se limpia los input para que no quede ninguna palabra en si queden limpios
document.getElementById('NameFilm').value  = "";
document.getElementById('Year').value  = "";
document.getElementById('Category').value  = "";
document.getElementById('People').value  = "";

document.getElementById("Modificar").style.display = 'block';


}
};

}