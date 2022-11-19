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
  let newColor;
  let backgroundColor;
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

  //gen btn html code block
  const buttonHTMLCode = document.createElement("div");
  buttonHTMLCode.classList.add("button-code");
  buttonDiv.appendChild(buttonHTMLCode);
  inputBtnText.addEventListener("keyup", () => {
    const inputTextVal = inputBtnText.value;
    generatedButton.innerHTML = inputTextVal;

    buttonHTMLCode.innerHTML = `<pre class="language-html"><code class="language-html token tag">
  <span class="token punctuation">&lt;</span>button<span class="token punctuation">&gt;</span><span style="color: #000;">${inputTextVal}</span><span class="token punctuation">&lt;/</span>button<span class="token punctuation">&gt;</span>
</code></pre>`;
  });

  const btnTextColorPicker = document.querySelector("#btn-text-color-picker");

  //gen btn color code block
  const buttonTextColorCode = document.createElement("div");
  buttonTextColorCode.classList.add("button-text-color-code");
  buttonDiv.appendChild(buttonTextColorCode);

  const btnTextColorInput = document.querySelector("#btn-text-color-input");
  btnTextColorPicker.addEventListener("color-changed", (event) => {
    newColor = event.detail.value;
    btnTextColorInput.value = newColor;
    generatedButton.style.color = newColor;

    buttonTextColorCode.innerHTML = `<pre class="language-html"><code class="language-css token tag"></span>button<span class="token punctuation">{</span><br />${
      newColor ? `<span style="color: #000;">color: ${newColor};</span>` : null
    }<br /><span style="color: #000;">background-color: </span><br /><span class="token punctuation">}</span>
    </code></pre>`;
  });

  btnTextColorInput.addEventListener("blur", () => {
    let newColor = btnTextColorPicker.value;
    newColor = btnTextColorInput.value;
    generatedButton.style.color = newColor;
    console.log(btnTextColorInput.value);
    //BTN color CSS code block goes here:
    buttonTextColorCode.innerHTML = `<pre class="language-html"><code class="language-css token tag"></span>button<span class="token punctuation">{</span><br />${
      newColor
        ? `<span style="color: #000;">color: ${newColor};</span><br />`
        : null
    }<span class="token punctuation">}</span>
  </code></pre>`;
  });

  const btnBackGroundColorPicker = document.querySelector(
    "#btn-background-color-picker"
  );
  const btnBackgroundColorInput = document.querySelector(
    "#btn-text-background-color-input"
  );
  btnBackGroundColorPicker.addEventListener("color-changed", (event) => {
    backgroundColor = event.detail.value;
    console.log(backgroundColor);
    btnBackgroundColorInput.value = backgroundColor;
    generatedButton.style.backgroundColor = backgroundColor;

    //BTN backgroundColor CSS code block goes here:
  });

  btnBackgroundColorInput.addEventListener("blur", () => {
    backgroundColor = btnBackGroundColorPicker.value;
    backgroundColor = btnBackgroundColorInput.value;
    generatedButton.style.backgroundColor = backgroundColor;
  });
}
