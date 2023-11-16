const entrada = document.getElementById("entrada");
const incompletos = document.getElementById("incompletos");
const completos = document.getElementById("completos");

entrada.addEventListener("keydown", (tecla) => {
    if(tecla.key === "Enter") {
        if (Regex(entrada.value)) {
            agregarElemento();
            actualizarStorage();
            entrada.value = "";
        }
        else {
            alert("Hola")
        }
    }
})

function Regex(param) {
    return /^[^\s]/g.test(param);
}

let contador = 1;

//esta función me la sugirió el bot y me pareció muy pro!!!

function crearElemento(etiqueta, atributos) {
    const elemento = document.createElement(etiqueta);
    for(const atributo in atributos) {
        elemento.setAttribute(atributo, atributos[atributo]);
    }
    return elemento;
}

function agregarElemento() {
    let tarea = crearElemento("li", {class: "elemento", id: `tareaNum${contador}`});
    let checkbox = crearElemento("input", {class: "checkbox", type: "checkbox", id: `inputNum${contador}`});
    let nombre = crearElemento("label", {class: "etiqueta", for: `inputNum${contador}`});
    let cancelar = crearElemento("i", {class: "eliminar fa-solid fa-xmark", style: "color: rgb(255, 126, 126);"})
    nombre.innerHTML = entrada.value;
    incompletos.append(tarea);
    tarea.append(checkbox, nombre, cancelar);
    cancelar.addEventListener("click", () => {
        tarea.remove();
        actualizarStorage();
    })
    checkbox.addEventListener("click", () => {
        if(checkbox.checked) {
            completos.append(tarea);
        }
        else {
            incompletos.append(tarea);
        }
        actualizarStorage();
    })
    contador++;
}

function restaurarEventos() {
    let checkboxes = document.querySelectorAll(".checkbox");
    let cancelar = document.querySelectorAll(".eliminar");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", () => {
            let tarea = checkbox.parentNode;
            if(checkbox.checked) {
                completos.append(tarea);
            }
            else {
                incompletos.append(tarea);
            }
            actualizarStorage();
        })
    });
    cancelar.forEach(eliminar => {
        eliminar.addEventListener("click", () => {
            let tarea = eliminar.parentNode;
            tarea.remove();
            actualizarStorage();
        })
    })
}

//todo lo que respecta al localStorage me ayudó el bot a entenderlo y programarlo

function actualizarStorage() {
    let incompletoString = incompletos.innerHTML;
    let completoString = completos.innerHTML;
    localStorage.setItem("tareasIncompletas",incompletoString);
    localStorage.setItem("tareasCompletas",completoString);
    let checkboxes = document.querySelectorAll(".checkbox");
    let checked = [];
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            checked.push(index);
        }
    });
    localStorage.setItem("checked", JSON.stringify(checked));
    localStorage.setItem("contador", contador);
}
  
window.onload = function() {
    let tareasIncompletas = localStorage.getItem("tareasIncompletas");
    let tareasCompletas = localStorage.getItem("tareasCompletas");
    if (tareasIncompletas) {
        incompletos.innerHTML = tareasIncompletas;
    }
    if (tareasCompletas) {
        completos.innerHTML = tareasCompletas;
    }
    restaurarEventos();
    let checked = JSON.parse(localStorage.getItem("checked"));
    if (checked) {
        let checkboxes = document.querySelectorAll(".checkbox");
        checked.forEach(index => {
            checkboxes[index].checked = true;
        });
    }
    let contadorStorage = localStorage.getItem("contador");
    if (contadorStorage) {
        contador = parseInt(contadorStorage);
    }
}

