function selectChanged() {
  var sel = document.getElementById("component-type");
  let form = document.getElementById("form");
  let button = document.getElementById("button");
  let buttonCode = document.getElementById("button-code");

  if (sel.value == "button") {
    button.style.display = "block";
    buttonCode.style.display = "block";
    this.makeButton();
  } else {
    button.style.display = "none";
    buttonCode.style.display = "none";
  }

  form.style.display = sel.value == "form" ? "block" : "none";
}

function makeButton() {
  //remove button if it exists
  this.button.removeChild(this.button.lastChild);

  const generateButton = document.createElement("button");
  generateButton.classList.add("generate-button");
  this.button.appendChild(generateButton);

  document.getElementById("button-text").addEventListener("keyup", () => {
    var x = document.getElementById("button-text").value;
    generateButton.innerHTML = x;
    console.log(x);
  });
}
