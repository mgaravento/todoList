// Las cosas por hacer y las cosas ya hechas
// -> Un array de las cosas hechas
// -> otro array de las cosas por hacer.
// Fechas
// [TODO] Poder ingresar las cosas <-
// Poder consultar las cosas por hacer y las cosas hechas

// La tarea
// -> Nombre o descripcion
// -> fecha
// -> estado

//Operaciones
// - Ver todas las tareas
// - Ver solo las tareas completadas
// - Ver solo las tareas que es pendientes

const fs = require("fs");
const path = require("path");

const tasksFileAbsolutePath = path.join(__dirname, "tasks.json"); // clase-5/tasks.json

const tasksJSON = fs.readFileSync(tasksFileAbsolutePath, { encoding: "utf-8" }); //<---

const tasks = JSON.parse(tasksJSON); // Convertir String en formato JSON a un Objecto de Javascript

function showAll() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const doneText = task.done ? "✔" : "⛔";
    console.log(`- [${doneText}] ${task.name} (${task.deadline})`);
  }
}

function showDone() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.done){
      console.log(`-${task.name} (${task.deadline})`)
    }
}
}

function showPending() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.done){
      console.log(`-${task.name} (${task.deadline})`)
    }
}
}

const param = process.argv[2];


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
    add(process.argv[3],process.argv[4]);
    break;
  default:
    console.log(
      "Los parametros aceptados son: 'all', 'done', 'pending' y 'toggle'"
    );
}


function changeStatus (){
  const changeTask = tasks[process.argv[3]]
 changeTask.done = !changeTask.done;
showAll()
save()
}

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

function save(){
   const tasksJSON = JSON.stringify(tasks, null, 2); // 2do par funcion que ponemos null,
   //3 param 2 que son espacios para que se ve mas prolijo si mosrtamos x consola
   fs.writeFileSync(tasksFileAbsolutePath, tasksJSON);
}
//function delete ()