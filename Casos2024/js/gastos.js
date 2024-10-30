//variables para los selectores

const formulario = document.getElementById('agregar_gasto');
const listadoG = document.querySelector('#gastos .list-group');

// Creación de eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto); // Evento para agregar gasto
}

//crear la clase principal

class Presupuesto 
{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }


}

class UI {
    insertarPresupuesto(cantidad) {
        document.getElementById('total').textContent = cantidad.presupuesto.toLocaleString('es-CO');
        document.getElementById('restante').textContent = cantidad.restante.toLocaleString('es-CO'); // Ajuste para mostrar el restante
    }
 
    agregarGastoLista(gasto, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${gasto.nombre} - $${gasto.cantidad.toLocaleString('es-CO')}`;
 
        // Crear botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger btn-sm';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => this.eliminarGasto(index); // Asigna la función de eliminar
 
        li.appendChild(btnEliminar);
        listadoG.appendChild(li);
    }
 
    eliminarGasto(index) {
        // Recuperar la cantidad del gasto que se va a eliminar
        const gastoEliminado = presupuesto.gastos[index];
   
        // Eliminar el gasto del array
        presupuesto.gastos.splice(index, 1);
       
        // Sumar la cantidad del gasto eliminado al presupuesto restante
        presupuesto.restante += gastoEliminado.cantidad;
   
        // Actualizar la lista de gastos en la UI
        this.actualizarListadoG();
   
        // Actualizar el presupuesto restante en la UI
        this.actualizarRestante(presupuesto.restante);
    }
   
 
    actualizarListadoG() {
        // Limpiar la lista actual y volver a agregar los gastos
        listadoG.innerHTML = '';
        presupuesto.gastos.forEach((gasto, index) => {
            this.agregarGastoLista(gasto, index);
        });
    }
 
    actualizarRestante(restante) {
        document.getElementById('restante').textContent = restante.toLocaleString('es-CO');
    }
}


//crear un objeto de la clase UI

const ui = new UI();
let presupuesto;

function preguntarPresupuesto(){
    let valorPresupuesto;
   
    do {
        valorPresupuesto = prompt('Ingresar el valor del presupuesto en $:');
       
        if (valorPresupuesto === null) {
            return;
        }
       
        valorPresupuesto = Number(valorPresupuesto);
       
        if (isNaN(valorPresupuesto) || valorPresupuesto <= 0) {
            alert('Por favor, ingresa un valor numérico válido y mayor que 0.');
        }
       
    } while (isNaN(valorPresupuesto) || valorPresupuesto <= 0);
 
    presupuesto = new Presupuesto(valorPresupuesto);
    ui.insertarPresupuesto(presupuesto);
}
 

// Función para agregar gasto
function agregarGasto(e) {
    e.preventDefault();
 
    const gastoNombre = document.getElementById('gasto').value;
    const gastoCantidad = Number(document.getElementById('cantidad').value);
 
    // Validar que el nombre del gasto no esté vacío y que la cantidad sea válida
    if (gastoNombre === '' || gastoCantidad <= 0) {
        alert('Por favor, ingresa un gasto válido.');
        return;
    }
 
    // Validar que el gasto no exceda el presupuesto restante
    if (gastoCantidad > presupuesto.restante) {
        alert('Error: El gasto no puede ser mayor que el presupuesto restante.');
        return;
    }
 
    const gasto = { nombre: gastoNombre, cantidad: gastoCantidad };
    presupuesto.gastos.push(gasto);
    presupuesto.restante -= gastoCantidad; // Restar del presupuesto restante
    ui.agregarGastoLista(gasto, presupuesto.gastos.length - 1); // Agregar a la lista de gastos
    ui.actualizarRestante(presupuesto.restante); // Actualizar UI
 
    // Limpiar formulario
    formulario.reset();
}