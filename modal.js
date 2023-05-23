const modal = document.querySelector(".instructions-modal");
const open = document.querySelector(".onboarding-link");
const close = document.querySelector(".modal-close");

open.addEventListener("click", () => {
  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});
