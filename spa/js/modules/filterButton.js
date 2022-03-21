import { $ } from "./dqselector.js";
$();

export function openFilter() {
  const filterButton = $(".open-filter");
  const filterSection = $("#filter");

  filterButton.addEventListener("click", function (e) {
    e.preventDefault();
    filterSection.classList.toggle("hidden");
  });

  console.log(filterButton);
}
