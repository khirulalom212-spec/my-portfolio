document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

const form = document.getElementById("contactForm");
const msgBox = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    msgBox.className = "form-msg";

    if (name.length < 3) {
      msgBox.textContent = "❌ Name must be at least 3 characters.";
      msgBox.classList.add("error");
      return;
    }

    if (message.length < 10) {
      msgBox.textContent = "❌ Message must be at least 10 characters.";
      msgBox.classList.add("error");
      return;
    }

    msgBox.textContent = "⏳ Sending...";
    
    emailjs
      .send("service_u6hqtnj", "template_aszlqeq", { name, message })
      .then(() => {
        msgBox.textContent = "✅ Message sent successfully!";
        msgBox.classList.add("success");
        form.reset();
      })
      .catch(() => {
        msgBox.textContent = "❌ Failed to send message.";
        msgBox.classList.add("error");
      });
  });
}


});

function appendValue(value){
  document.getElementById("display").value += value;
}

function clearDisplay(){
  document.getElementById("display").value = "";
}

function calculate(){
  const display = document.getElementById("display");
  try{
    display.value = eval(display.value);
  }catch{
    display.value = "Error";
  }
}

function appendDecimal(){
  const display = document.getElementById("display");
  const value = display.value;

  const parts = value.split(/[\+\-\*\/]/);
  const lastNumber = parts[parts.length - 1];

  if (lastNumber.includes(".")) return;

  display.value += ".";
}
function backspace(){
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}
function percent(){
  const display = document.getElementById("display");
  const value = display.value;

  const match = value.match(/(\d+(\.\d+)?)([\+\-\*\/])(\d+(\.\d+)?)$/);

  if (!match) return;

  const firstNumber = parseFloat(match[1]);
  const operator = match[3];
  const secondNumber = parseFloat(match[4]);

  let result;

  if (operator === "+" || operator === "-") {
    const percentValue = (firstNumber * secondNumber) / 100;
    result = operator === "+"
      ? firstNumber + percentValue
      : firstNumber - percentValue;
  } else if (operator === "*") {
    result = firstNumber * (secondNumber / 100);
  } else if (operator === "/") {
    result = firstNumber / (secondNumber / 100);
  }

  display.value = result;
}
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (key >= "0" && key <= "9") {
    appendValue(key);
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendValue(key);
    return;
  }

  if (key === ".") {
    appendDecimal();
    return;
  }

  if (key === "Enter") {
    e.preventDefault();
    calculate();
    return;
  }

  if (key === "Backspace") {
    backspace();
    return;
  }

  if (key === "Escape") {
    clearDisplay();
    return;
  }
  
  if (key === "%") {
    percent();
    return;
  }
});
const toggleBtn = document.getElementById("themeToggle");
const THEME_KEY = "site_theme";

// Load saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  if (toggleBtn) toggleBtn.textContent = "☀️ Light";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");

    toggleBtn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  });
}
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight - 80){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const typeEl = document.getElementById("typewriter");

if (typeEl) {
  const text = "Khairul";
  let i = 0;

  function type() {
    if (i <= text.length) {
      typeEl.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 120);
    }
  }

  type();
}


