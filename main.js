import "./styles/style.scss";
import "./styles/reset.scss";
import "./data.js";
import { images } from "./data.js";

console.log("main.js loaded");

// Get references to the draggable and droppable elements
const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");
const items = document.querySelectorAll(".box");
const rubbishSection = document.querySelector(".rubbish-section");

function startDraggable() {
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
}

function spawnItems() {
  for (let i = 0; i < items.length; i++) {
    items[i].style.top =
      Math.floor(Math.random() * (window.innerHeight - 100)) + "px";
    items[i].style.right =
      Math.floor((Math.random() * window.innerWidth - 100) / 2) + 100 + "px";
  }
}

function renderItems() {
  images.forEach((image) => {
    rubbishSection.innerHTML += `
      <div class="box" draggable="true">
      <img
        class="rubbish draggable"
        src=${image.src}
        draggable="true"
        id=${image.id}
        alt=${image.alt}
      />
      </div>
    `;
  });
}

// rubbishSection.insertAdjacentHTML("beforeend", );

function gameInit() {
  startDraggable();
  // renderItems();
  spawnItems();
}

gameInit();
