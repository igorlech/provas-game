import "./styles/style.scss";
import "./styles/reset.scss";

const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");
const empty = document.querySelectorAll(".empty");
const endModal = document.querySelector(".end-modal");
const modalOverlay = document.querySelector(".modal-overlay");

function gameInit() {
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
    });
  });

  droppables.forEach((droppable) => {
    droppable.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  });

  droppables.forEach((droppable) => {
    droppable.addEventListener("drop", (event) => {
      const data = event.dataTransfer.getData("text");
      const draggableElement = document.getElementById(data);
      event.preventDefault();
      droppable.appendChild(draggableElement);
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
        droppable.classList.add("green");
      } else if (
        !droppable.hasChildNodes() ||
        droppable.classList.contains("removed-items") ||
        droppable.classList.contains("rubbish-section")
      ) {
        droppable.classList.remove("green");
        droppable.classList.remove("red");
      } else {
        droppable.classList.add("red");
      }

      let emptiesArray = Array.from(empty);

      let check = emptiesArray.every((empty) =>
        empty.classList.contains("green")
      );

      if (check) {
        endModal.style.display = "flex";
        modalOverlay.style.display = "flex";
      }
    }, 100);
  });
}

gameInit();
