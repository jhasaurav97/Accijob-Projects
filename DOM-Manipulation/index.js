let countEl = document.getElementById("count");
const errorText = document.getElementById("errorMsg");
const incrementBtn = document.querySelector(".inc");
const decrementBtn = document.querySelector(".dec");
const clearBtn = document.querySelector(".clr");

let count = 1;

function updateDisplay() {
  countEl.textContent = count;
  errorText.style.display = count > 0 ? "none" : "block";
  decrementBtn.disabled = count === 0 ? true : false;
  clearBtn.style.display = count === 0 ? "none" : "block";
}

function incrment() {
  count++;
  updateDisplay();
}

function decrement() {
  if (count > 0) {
    count--;
    updateDisplay();
  } else {
    errorText.style.display = "block";
  }
}

function clear() {
  count = 0;
  updateDisplay();
}

decrementBtn.addEventListener("click", decrement);
incrementBtn.addEventListener("click", incrment);
clearBtn.addEventListener("click", clear);

updateDisplay();
