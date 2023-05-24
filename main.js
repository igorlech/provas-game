import "./styles/style.scss";
import "./styles/reset.scss";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function createDraggable() {
  Draggable.create(".box", { bounds: ".draggable" });
  console.log("draggable component loaded");
}

function gameInit() {
  createDraggable();
}

gameInit();
