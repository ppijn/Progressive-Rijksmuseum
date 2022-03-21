// Skeleton State
import { $ } from "./dqselector.js";
$();

export function removeSkeletonState() {
  const skeleton = $("ul.empty-list");
  console.log(skeleton);
  skeleton.classList.remove("hidden");
}

export function addSkeletonState() {
  const skeleton = $("ul.empty-list");
  console.log(skeleton);
  skeleton.classList.add("hidden");
}
