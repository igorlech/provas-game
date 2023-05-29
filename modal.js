const modal = document.querySelector(".instructions-modal");
const open = document.querySelector(".onboarding-link");
const close = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");

open.addEventListener("click", () => {
  modal.style.display = "block";
  overlay.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});
