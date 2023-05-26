import "./styles/style.scss";
import "./styles/reset.scss";
import { images } from "./data.js";

console.log("main.js loaded");

const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");

const rubbishSection = document.querySelector(".rubbish-section");

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
      const data = event.dataTransfer.getData("text");
      const draggableElement = document.getElementById(data);
      event.preventDefault();
      console.log(data); // gets link instead of id
      console.log(draggableElement); // gets null here
      droppable.appendChild(draggableElement); // appends null = error
    });

    window.setInterval(function () {
      if (
        (droppable.classList.contains("metal-bin") &&
          droppable.hasChildNodes() &&
          droppable.firstChild.classList.contains("metal")) ||
        (droppable.classList.contains("food-bin") &&
          droppable.hasChildNodes() &&
          droppable.firstChild.classList.contains("food"))
      ) {
        console.log("metal");
        droppable.classList.add("green");
      } else if (
        !droppable.hasChildNodes() ||
        droppable.classList.contains("removed-items")
      ) {
        droppable.classList.remove("green");
        droppable.classList.remove("red");
      } else {
        console.log("food, red");
        droppable.classList.add("red");
      }
    }, 100);
  });
}

function gameInit() {
  // renderItems();
  startDraggable();
}

gameInit();
