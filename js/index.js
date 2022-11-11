var sel = document.getElementById("component-type");
let form = document.getElementById("form");
let buttonDiv = document.getElementById("button");
let buttonCode = document.getElementById("button-code");

function selectChanged() {
  //TODO: change to switch statement
  if (sel.value == "button") {
    buttonDiv.style.display = "block";
    this.makeButton();
  } else {
    buttonDiv.style.display = "none";
  }

  form.style.display = sel.value == "form" ? "block" : "none";
}

function makeButton() {
  //remove button if it exists
  buttonDiv.removeChild(buttonDiv.lastChild);

  const generatedButton = document.createElement("button");
  generatedButton.classList.add("generated-button");
  buttonDiv.appendChild(generatedButton);

  var buttonCode = document.createElement("div");
  buttonDiv.appendChild(buttonCode);
  document.getElementById("button-text").addEventListener("keyup", () => {
    var x = document.getElementById("button-text").value;
    generatedButton.innerHTML = x;

    buttonCode.innerHTML = `<pre class="language-html"><code class="language-html token tag">
  <span class="token punctuation">&lt;</span>button<span class="token punctuation">&gt;</span><span style="color: #000;">${x}</span><span class="token punctuation">&lt;/</span>button<span class="token punctuation">&gt;</span>
</code></pre>`;
  });
}
