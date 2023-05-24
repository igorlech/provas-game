import "./styles/style.scss";
import "./styles/reset.scss";

// function init() {
//   function dragOver(ev) {
//     ev.preventDefault();
//   }

//   function dragStart(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
//   }

//   function drop(ev) {
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
//   }
// }

// init();

console.log("main.js loaded");

// Get references to the draggable and droppable elements
const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");

// Define the dragstart event handler for the draggable elements
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

// Define the dragover event handler for the droppable elements
droppables.forEach((droppable) => {
  droppable.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
});

// Define the drop event handler for the droppable elements
droppables.forEach((droppable) => {
  droppable.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(data);
    droppable.appendChild(draggableElement);
  });
});
