import { getData } from "./modules/getdata.js";
import { jaar } from "./modules/jaar.js";
import { search } from "./modules/search.js";
import { page } from "./modules/page.js";
import { backToHome } from "./modules/detail.js";
import { openFilter } from "./modules/filterButton.js";
import "./modules/vendor/routie.min.js";

export function handleRoutes() {
  routie({
    "": () => {
      let inputField = "";
      search(inputField);
    },
    ":id": (inputField) => {
      search(inputField);
    },
  });
}

jaar();
page();
backToHome();
openFilter();
handleRoutes();

const searchForm = document.querySelector("header form");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchValue = document.querySelector("header input").value;
  window.location.hash = searchValue;
});
