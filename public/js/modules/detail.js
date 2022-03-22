export function backToHome() {
  const homeDisplay = $("#home");
  const artDisplay = $("#art-list");
  const infoDisplay = $("#information");
  const backButton = $(".back");

  backButton.addEventListener("click", function (e) {
    console.log();
    e.preventDefault();
    infoDisplay.classList.toggle("hidden");
    homeDisplay.classList.toggle("hidden");
    artDisplay.classList.toggle("hidden");

    console.log(backButton);
  });

  function $(element) {
    return document.querySelector(element);
  }
  function $$(element) {
    return document.querySelectorAll(element);
  }
}
