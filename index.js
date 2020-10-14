

const { Console } = require("console");
//solicitamos filesync para leer el archivo de texto json
const fs = require("fs");
//solicitamos path para determinar el camino a nuestro arch json
const path = require("path"); 

// nos da el camino exacto al archivo json desde la raiz de la pc y con el formato que corresponda al so
const tasksFileAbsolutePath = path.join(__dirname, "tasks.json"); 
const helpFileAbsolutePath = path.join(__dirname, "help.json");

const tasksJSON = fs.readFileSync(tasksFileAbsolutePath, { encoding: "utf-8" }); 
const helpJSON = fs.readFileSync (helpFileAbsolutePath, {encoding:"utf-8" });
// en la const tasksjson guardamos lo que esta en el archivo json que leemos con el fs y traemos con el path
//el encoding es para que coincida con todos nuestros caracteres

const tasks = JSON.parse(tasksJSON); 
const help = JSON.parse(helpJSON);
// const tasks va a guardar lo que esta en el arch json pasado a formato js con el .parse



const param = process.argv[2]; 
//guardamos en param el seg parametro que pondremos el consola para poder armar el swith
// y determinar que ejecutar en cada caso

switch (param) {
  case "all":
    showAll();
    break;
  case "done":
    showDone();
    break;
  case "pending":
    showPending();
    break;
  case "toggle":
    changeStatus();
    break;
  case "add":
    add(process.argv[3], process.argv[4]);
    break;
  case "remove":
    erase(process.argv[3]);
    break;
  default:
    console.log(help);
}

//muestra todas las tareas registradas
function showAll() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const doneText = task.done ? "✔" : "⛔";
    console.log(`- [${doneText}] ${task.name} (${task.deadline})`);
  }
}



//muestra las tareas realizadas
function showDone() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.done){
      console.log(`-${task.name} (${task.deadline})`)
    }
}
}

//muestra las tareas pendientes
function showPending() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.done){
      console.log(`-${task.name} (${task.deadline})`)
    }
}
}


//cambia el estado de pendiente a realizado y viceversa
function changeStatus (){
  const changeTask = tasks[process.argv[3]]
 changeTask.done = !changeTask.done;
showAll()
save()
}


//agrega nuevas tareas
function add (name, deadline){
  const newtask = {
    name: name,
    deadline : deadline,
    done: false,
  };
  tasks.push(newtask);
  save()
  showAll()
}


//elimina tarea por nombre
function erase(name) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].name == name) {
      tasks.splice(i, 1)
      save()
    }
  }
  showAll()
}


//guarda los cambios en nuestro archivojson
function save(){  //para guardar los cambios en el archivo json, sino no lo que hagamos queda en la nada
   const tasksJSON = JSON.stringify(tasks, null, 2); // 2do par funcion que ponemos null,
   //3 param 2 que son espacios para que se ve mas prolijo si mosrtamos x consola
   //pasamos a formato json la const con los nuevos cambios
   fs.writeFileSync(tasksFileAbsolutePath, tasksJSON);
   // la guardamos con el fs en vez de read, write y como parametros mandamos el camino y lo 
   //que queremos guardar
}




