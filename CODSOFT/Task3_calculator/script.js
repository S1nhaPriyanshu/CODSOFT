const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let currentInput = "";
let operator = "";
let firstValue = "";
let shouldResetDisplay = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (!value) return;

    if (["+", "-", "*", "/"].includes(value)) {
      if (firstValue && currentInput && operator) {
        firstValue = operate(firstValue, currentInput, operator);
        display.textContent = firstValue;
        currentInput = "";
      } else {
        firstValue = display.textContent;
        currentInput = "";
      }
      operator = value;
      shouldResetDisplay = true;
    } else {
      if (display.textContent === "0" || shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
      } else {
        display.textContent += value;
      }
      currentInput = display.textContent;
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (!firstValue || !operator || !currentInput) return;
  const result = operate(firstValue, currentInput, operator);
  display.textContent = result;
  firstValue = result;
  currentInput = "";
  operator = "";
  shouldResetDisplay = true;
});

clearBtn.addEventListener("click", () => {
  display.textContent = "0";
  firstValue = "";
  currentInput = "";
  operator = "";
});

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b !== 0 ? a / b : "Error";
  return b;
}
