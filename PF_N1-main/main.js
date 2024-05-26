

/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/

const tasks = document.querySelector('.Listatareas');
const TareaLista = [
  {
    id: 1,
    titulo: "Terminar proyecto final",
    Completed: false

},
{
  id: 2,
  titulo: "Ir al gym y ejercitarme",
  Completed: true

},
{
  id: 3,
  titulo: "Ir de paseo el sabado",
  Completed: false

},

]

const All_btn= document.querySelector('#subtitulosAll');
let SubtituloActive_btn = document.querySelector('#SubtituloActive');
let SubtituloCompleted_btn =  document.querySelector('#SubtituloCompleted');

const Input = document.querySelector('#TareasBuscar');

const deleteAll_btn = document.querySelector('.deleteAll');
const botonAdd = document.querySelector('#boton')

let active_view = 'all';


all()


function all(){

    tasks.innerHTML ='';
    TareaLista.forEach(task =>{
      showInDom(task.id, task.titulo, task.Completed);
    });

}

function active(){
  tasks.innerHTML =''
  TareaLista.forEach(task =>{
    if (task.Completed === false){
     showInDom(task.id, task.titulo, task.Completed)
    }
     
    })
}

function completed(){
  tasks.innerHTML =''
  TareaLista.forEach(task =>{
    if (task.Completed === true){
     showInDom(task.id, task.titulo, task.Completed, true);
    }
  
  });
        

}
 


/*Esta si va porque muestra si esta en all, activo o completada y lo condiciona al momento de presion el respectivo boto*/ 

function showInDom(id, titulo, Completed,  show  ){
    
  const li_template = `
  <li class = "uno" >
    <div> 
     <input type="checkbox"  id="${id}" ${Completed && 'checked'}>
     <label for="${id}" >${titulo}</label>
     ${active_view === 'SubtituloCompleted' && show  ? `<button  id="${id}"><i class="fa-solid fa-trash"></i></button>`:''}
    </div>
    
  </li>`;
   tasks.innerHTML += li_template;

   // Agregar evento de clic al botón trash correspondiente si estamos en la vista 'SubtituloCompleted'
   if (active_view === 'SubtituloCompleted' && show) {
    const trashButton = document.getElementById(`trash_${id}`);
    trashButton.addEventListener('click', function() {
        deleteTask(id);
    });
  }

}

botonAdd.addEventListener('click', function(){
  const inputValue = Input.value.trim(); // Obtener el valor del input y eliminar espacios en blanco al inicio y al final

  if (inputValue !== '') { // Verificar si el input no está vacío
      const newTask = { // Crear un nuevo objeto de tarea con los datos del input
          id: TareaLista.length + 1, // Asignar un nuevo ID incrementando el tamaño del arreglo en 1
          titulo: inputValue,
          Completed: false
      };

      TareaLista.push(newTask); // Agregar la nueva tarea al arreglo de tareas
      showInDom(newTask.id, newTask.titulo, newTask.Completed); // Mostrar la nueva tarea en el DOM
      Input.value = ''; // Limpiar el input después de agregar la tarea
  }
});


/*Eventos para los subtitulos y que muestren las tareas*/

All_btn.addEventListener('click', function(){
     active_view = 'subtitulosAll'
     all()
     verbtnActivo()
     

} )


SubtituloActive_btn.addEventListener('click', function(){
    active_view = 'SubtituloActive'
    active()
    verbtnActivo()

})



SubtituloCompleted_btn.addEventListener('click', function(){
    active_view = 'SubtituloCompleted'

    completed();
    
    verbtnActivo();


}) 

/*Eventos para invocar funciones de eliminar y agregar*/

deleteAll_btn.addEventListener('click', function(){
  deleteCompletedtasks(); 
  completed();
})

botonAdd.addEventListener('click', function(){
      if (botonAdd === Input){
        
        all();
      }
})



function verbtnActivo(){

  switch(active_view){
    case 'subtitulosAll':
      All_btn.classList.add('activo')
      SubtituloActive_btn.classList.remove('activo')
      SubtituloCompleted_btn.classList.remove('activo')
      deleteAll_btn.style.display = 'none';
        break;
    case 'SubtituloActive':
      All_btn.classList.remove('activo')
      SubtituloActive_btn.classList.add('activo')
      SubtituloCompleted_btn.classList.remove('activo')
      deleteAll_btn.style.display = 'none';

        break;
    case 'SubtituloCompleted':
      All_btn.classList.remove('activo')
      SubtituloActive_btn.classList.remove('activo')
      SubtituloCompleted_btn.classList.add('activo')
      deleteAll_btn.style.display = 'block';
        break;
  }

}

/* botonAdd.addEventListener('click', function(){
   addTask()
   
  

}) */


/*Funcion para actualizar una tarea que se hizo checked*/ 
tasks.addEventListener('change', (e)=>{
  if(e.target.tagName === 'INPUT'){
   completeTask(parseInt(e.target.id));
   /* console.log(TareaLista)  */
  }
});


// Función para eliminar una tarea del arreglo TareaLista
function deleteTask(id) {
  // Filtrar el arreglo TareaLista para mantener solo las tareas que no coincidan con el ID proporcionado
  TareaLista = TareaLista.filter(tarea => tarea.id !== id);
  // Mostrar nuevamente la lista de tareas completadas después de eliminar la tarea
  completed();
}



// Función para marcar una tarea como completada o incompleta
// y la transfiere al boton correspondiente sea all,active o completed
function completeTask(id){
  /* tasks.innerHTML='' */
  const index = TareaLista.findIndex(tarea => tarea.id === id)
  
  TareaLista[index].Completed = !TareaLista[index].Completed;
  tasks.innerHTML ='';
  switch (active_view){
    case'subtitulosAll':
     all();
     break;
    case 'SubtituloActive':
      active();
      break;
      case 'SubtituloCompleted':
        completed();
        break;
  }

}

  
   /* addTask()  */
   


/* Esta funcion elimina todas las tareas y luego actualiza las funciones all()
active y completed */

function deleteCompletedtasks(){
  TareaLista = TareaLista.filter(task => !task.Completed);
  switch (active_view) {
    case 'subtitulosAll':
      all();
      break;
    case 'SubtituloActive':
      active();
      break;
    case 'SubtituloCompleted':
      completed();
      break;
  }
}


// Función para añadir una nueva tarea
 /*function addTask(TareaLista) {
  tasks.innerHTML = ''
  TareaLista.forEach(tarea =>{
   tasks.innerHTML += /*`
    <li class = "uno">
    
      <label for="${tarea.id}" >
         <input type="checkbox" name="${tarea.id}" id="${tarea.id}" class="${tarea.id}" ${tarea.Completed && 'checked'} onChange="completeTask(${tarea.id})">
        ${ tarea.titulo}
      </label>
      <button id="trash_1"><i class="fa-solid fa-trash"></i></button>
   </li>

    
    ` *//*`
   /*  <li class = "uno" >
    <div> 
     <input type="checkbox"  id="${tarea.id}" ${tarea.Completed && 'checked'}>
     <label for="${tarea.id}" >${tarea.titulo}</label>
     ${active_view === 'Completed' && show ? `<button id="${trash_1}"><i class="fa-solid fa-trash"></i></button>`:''}
    </div>
    
  </li>
 
  `
  })
  tasks.push(TareaLista)
  all(TareaLista, tasks)
   
}   */



/* botonAdd.addEventListener('click', () =>{
  /* e.preventDefault() */
 /*  addTask(0, id.value, titulo.value, completed.value, tasks, TareaLista); */
  /* Input.requestFullscreen() */
/*}) */

/*Esta es otra manera de cargar el array */

/* function agregarTareas(TareaLista, tasks){
TareaLista.forEach((tarea) => {
  showInDom(tarea.id, tarea.name, tarea.Completed, tasks)
})
} */
 




/*Funcion para actualizar una tarea que se hizo checked*/ 
/* tasks.addEventListener('click', (e)=>{
     if(e.target.tagName === 'INPUT'){
      completeTask(parseInt(e.target.id));
      /* console.log(TareaLista)  */
    /* }
}); */

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
/* function completeTask(){
 

} */


// Función para borrar una tarea
/* function deleteTask(id, TareaLista) {
    const index = TareaLista.findIndex(tarea => tarea.id === id)
    if ( index >= 0){
    TareaLista.splice(index, 1);
    showInDom(TareaLista, Tasks)
    }
     
  
}  */

// Funcion para borrar todas las tareas
/* function deleteAll() {
  
  
} */

// Función para filtrar tareas completadas
/* function filterCompleted() {
  TareaLista = TareaLista.filter(tarea => !tarea.Completed)
    
} */

// Función para filtrar tareas incompletas
/* function filterUncompleted() {
    if (tasks != 'checked')
    TareaLista = TareaLista.filter(tarea => !tarea.acti)
} */

