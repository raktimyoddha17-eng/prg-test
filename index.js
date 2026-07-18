const result = document.getElementById("result");
const history = document.getElementById("history");

const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
      case "AC":
        expression = "";
        update();
        break;

      case "⌫":
        expression = expression.slice(0, -1);
        update();
        break;

      case "=":
        calculate();
        break;

      default:
        expression += value;
        update();
    }
  });
});

function update() {
  history.textContent = expression;

  result.textContent = expression || "0";
}

function calculate() {
  if (expression === "") return;

  try {
    const answer = Function('"use strict";return (' + expression + ")")();

    history.textContent = expression + " =";

    result.textContent = answer;

    expression = answer.toString();
  } catch {
    result.textContent = "Error";

    expression = "";
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9+\-*/.%]/.test(key)) {
    expression += key;
    update();
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    update();
  } else if (key === "Escape") {
    expression = "";
    update();
  }
});
result.addEventListener("dblclick", async () => {
    try {
        await navigator.clipboard.writeText(result.textContent);
    } catch {}
});
