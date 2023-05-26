import "./styles/style.scss";
import "./styles/reset.scss";
import { images } from "./data.js";

console.log("main.js loaded");

const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");
const food = document.querySelectorAll(".food");
const metal = document.querySelectorAll(".metal");
const foodBin = document.querySelectorAll(".food-bin");
const metalBin = document.querySelectorAll(".metal-bin");

const rubbishSection = document.querySelector(".rubbish-section");
// const replayButton = document.querySelector(".replay-button");

function renderItems() {
  images.forEach((image) => {
    let divBox = document.createElement("div");
    divBox.classList.add("box");
    divBox.setAttribute("draggable", "true");

    let divImg = document.createElement("img");
    divImg.classList.add("rubbish");
    divImg.classList.add("draggable");
    divImg.setAttribute("src", image.src);
    divImg.setAttribute("alt", image.alt);
    divImg.setAttribute("id", image.id);
    divImg.setAttribute("draggable", "true");

    divBox.appendChild(divImg);
    rubbishSection.appendChild(divBox);
  });
}

function startDraggable() {
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
      console.log(event.target.id);
      console.log("dragstart");
    });
  });

  droppables.forEach((droppable) => {
    droppable.addEventListener("dragover", (event) => {
      event.preventDefault();
      console.log("dragover");
    });
  });

  droppables.forEach((droppable) => {
    droppable.addEventListener("drop", (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("text");
      const draggableElement = document.getElementById(data);
      console.log(data); // gets link instead of id
      console.log(draggableElement); // gets null here
      droppable.appendChild(draggableElement); // appends null = error

      if (
        droppable.classList.contains("metal-bin") &&
        droppable.hasChildNodes()
      ) {
        console.log("metal");
        droppable.classList.add("green");
      } else if (!droppable.hasChildNodes()) {
        droppable.classList.remove("green");
      } else if (!droppable.classList.contains("metal-bin")) {
        droppable.style.backgroundColor = "red";
      }
    });
  });
}

// function correctCheck() {
//   droppables.forEach((droppable) => {
//     if (droppable.classList.contains("metal-bin")) {
//       console.log("metal");
//       droppable.style.backgroundColor = green;
//     }
//   });
// }

function gameInit() {
  // renderItems();
  startDraggable();
  // correctCheck();
}

gameInit();
