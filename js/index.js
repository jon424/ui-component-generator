const sel = document.getElementById("component-type");
let form = document.getElementById("form");
let buttonDiv = document.getElementById("button");
let buttonCode = document.getElementById("button-code");
let uiComponentForm = document.getElementById("ui-component-form");

function selectChanged() {
  if (sel.value == "button") {
    buttonDiv.style.display = "block";
    this.makeButton();
  } else {
    buttonDiv.style.display = "none";
  }
  form.style.display = sel.value == "form" ? "block" : "none";
}

//multi-select dropdown menu
let expanded = false;
function showCheckboxes(event) {
  console.log(event.target.classList);
  let checkboxes = document.getElementById("checkboxes");

  if (
    !expanded ||
    event.target.tagName === "INPUT" ||
    event.target.tagName === "LABEL"
  ) {
    checkboxes.style.display = "block";
    expanded = true;
    event.stopPropagation();
    document.onclick = function () {
      checkboxes.style.display = "none";
      expanded = false;
    };
  } else {
    checkboxes.style.display = "none";
    expanded = false;
    console.log(expanded);
  }
}
