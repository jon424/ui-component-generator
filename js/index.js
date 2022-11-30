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
  }
}

function incDecPaddingValControls() {
  let count = 1;
  const addBtn = document.getElementById("addBtn");
  const subtractBtn = document.getElementById("subtractBtn");

  let secondInput = document.querySelectorAll("#padding-input-2")[0];
  let secondSelect = document.querySelectorAll("#padding-select-2")[0];
  let thirdInput = document.querySelectorAll("#padding-input-3")[0];
  let thirdSelect = document.querySelectorAll("#padding-select-3")[0];
  let fourthInput = document.querySelectorAll("#padding-input-4")[0];
  let fourthSelect = document.querySelectorAll("#padding-select-4")[0];

  secondInput.style.display = "inline-block";
  secondSelect.style.display = "inline-block";

  addBtn.onclick = () => {
    count++;

    if (count === 1) {
      secondInput.style.display = "inline-block";
      secondSelect.style.display = "inline-block";
    } else if (count === 2) {
      thirdInput.style.display = "inline-block";
      thirdSelect.style.display = "inline-block";
    } else if (count === 3) {
      fourthInput.style.display = "inline-block";
      fourthSelect.style.display = "inline-block";
    }
  };

  subtractBtn.onclick = () => {
    if (count <= 0) {
      count = 0;
    }
    if (count > 3) {
      count = 3;
    }
    if (count >= 3) {
      fourthInput.style.display = "none";
      fourthSelect.style.display = "none";
      count--;
    } else if (count >= 2 && thirdInput.style.display === "inline-block") {
      thirdInput.style.display = "none";
      thirdSelect.style.display = "none";
      count--;
    } else if (count >= 1 && secondInput.style.display === "inline-block") {
      secondInput.style.display = "none";
      secondSelect.style.display = "none";
      count = 0;
    }
  };
}

let buttonPadding;

function makeButton() {
  //remove button if it exists
  const previousBtn = document.getElementsByClassName("generated-button");
  const inputBtnText = document.getElementById("button-text");
  let newColor;
  let backgroundColor;
  while (previousBtn.length > 0) {
    return;
  }

  //gen btn
  const generatedButton = document.createElement("button");
  generatedButton.classList.add("generated-button");
  buttonDiv.appendChild(generatedButton);
  buttonDiv.prepend(generatedButton);

  // padding
  // label: Margin <input type="text (number)" /> <dropdown (px, em, etc...)> <button>+</button> <button>-</button> UP TO FOUR for the margin args

  //gen btn html code block
  const buttonHTMLCode = document.createElement("div");
  buttonHTMLCode.classList.add("button-code");
  buttonDiv.appendChild(buttonHTMLCode);
  inputBtnText.addEventListener("keyup", () => {
    const inputTextVal = inputBtnText.value;
    generatedButton.innerHTML = inputTextVal;

    buttonHTMLCode.innerHTML = `<p>HTML</p><pre class="language-html"><code class="language-html token tag"><span class="token punctuation">&lt;</span>button<span class="token punctuation">&gt;</span><span style="color: #000;">${inputTextVal}</span><span class="token punctuation">&lt;/</span>button<span class="token punctuation">&gt;</span>
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

    buttonTextColorCode.innerHTML = `<p>CSS</p><pre class="language-html"><code class="language-css token tag"></span>button<span class="token punctuation">{</span><br />${
      backgroundColor
        ? `<span style="color: #000;">background-color: ${backgroundColor} </span><br />`
        : ""
    }${
      newColor
        ? `<span style="color: #000;">color: ${newColor};</span><br />`
        : ""
    }<span class="token punctuation">}</span>
    </code></pre>`;
  });

  btnTextColorInput.addEventListener("blur", () => {
    let newColor = btnTextColorPicker.value;
    newColor = btnTextColorInput.value;
    generatedButton.style.color = newColor;
    //BTN color CSS code block goes here:
    buttonTextColorCode.innerHTML = `<p>CSS</p><pre class="language-html"><code class="language-css token tag"></span>button<span class="token punctuation">{</span><br />${
      backgroundColor
        ? `<span style="color: #000;">background-color: ${backgroundColor} </span><br />`
        : ""
    }${
      newColor
        ? `<span style="color: #000;">color: ${newColor};</span><br />`
        : ""
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
    btnBackgroundColorInput.value = backgroundColor;
    generatedButton.style.backgroundColor = backgroundColor;

    //BTN backgroundColor CSS code block goes here:
    buttonTextColorCode.innerHTML = `<p>CSS</p><pre class="language-html"><code class="language-css token tag"></span>button<span class="token punctuation">{</span><br />${
      backgroundColor
        ? `<span style="color: #000;">background-color: ${backgroundColor} </span><br />`
        : ""
    }${
      newColor
        ? `<span style="color: #000;">color: ${newColor};</span><br />`
        : ""
    }<span class="token punctuation">}</span>
    </code></pre>`;
  });

  btnBackgroundColorInput.addEventListener("blur", () => {
    backgroundColor = btnBackGroundColorPicker.value;
    backgroundColor = btnBackgroundColorInput.value;
    generatedButton.style.backgroundColor = backgroundColor;

    buttonTextColorCode.innerHTML = `<p>CSS</p><pre class="language-html"><code class="language-css token tag"></span>button<span class="token punctuation">{</span><br />${
      backgroundColor
        ? `<span style="color: #000;">background-color: ${backgroundColor} </span><br />`
        : ""
    }${
      newColor
        ? `<span style="color: #000;">color: ${newColor};</span><br />`
        : ""
    }<span class="token punctuation">}</span>
    </code></pre>`;
  });
}
