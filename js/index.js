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

function makeButton() {
  //remove button if it exists
  const previousBtn = document.getElementsByClassName("generated-button");
  const previousBtnCode = document.getElementsByClassName("button-code");
  const inputBtnText = document.getElementById("button-text");
  while (previousBtn.length > 0 && previousBtnCode.length > 0) {
    previousBtn[0].parentNode.removeChild(previousBtn[0]);
    previousBtnCode[0].parentNode.removeChild(previousBtnCode[0]);
    inputBtnText.value = "";
  }

  //gen btn
  const generatedButton = document.createElement("button");
  generatedButton.classList.add("generated-button");
  buttonDiv.appendChild(generatedButton);
  uiComponentForm.appendChild(generatedButton);

  //gen btn code block
  const buttonCode = document.createElement("div");
  buttonCode.classList.add("button-code");
  buttonDiv.appendChild(buttonCode);
  inputBtnText.addEventListener("keyup", () => {
    const inputTextVal = inputBtnText.value;
    generatedButton.innerHTML = inputTextVal;

    buttonCode.innerHTML = `<pre class="language-html"><code class="language-html token tag">
  <span class="token punctuation">&lt;</span>button<span class="token punctuation">&gt;</span><span style="color: #000;">${inputTextVal}</span><span class="token punctuation">&lt;/</span>button<span class="token punctuation">&gt;</span>
</code></pre>`;
  });

  const btnTextColorPicker = document.querySelector("#btn-text-color-picker");

  const btnTextColorInput = document.querySelector("#btn-text-color-input");
  btnTextColorPicker.addEventListener("color-changed", (event) => {
    const newColor = event.detail.value;
    btnTextColorInput.value = newColor;
    generatedButton.style.color = newColor;
  });

  btnTextColorInput.addEventListener("blur", () => {
    let newColor = btnTextColorPicker.value;
    newColor = btnTextColorInput.value;
    generatedButton.style.color = newColor;
  });

  const btnBackGroundColorPicker = document.querySelector(
    "#btn-background-color-picker"
  );
  const btnTextBackgroundColorInput = document.querySelector(
    "#btn-text-background-color-input"
  );
  btnBackGroundColorPicker.addEventListener("color-changed", (event) => {
    const newColor = event.detail.value;
    console.log(newColor);
    btnTextBackgroundColorInput.value = newColor;
    generatedButton.style.backgroundColor = newColor;
  });

  btnTextBackgroundColorInput.addEventListener("blur", () => {
    let newColor = btnBackGroundColorPicker.value;
    newColor = btnTextBackgroundColorInput.value;
    generatedButton.style.backgroundColor = newColor;
  });

  // get current color value
  console.log(picker.color);
}
