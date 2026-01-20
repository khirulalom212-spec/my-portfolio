document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

  const form = document.getElementById("contactForm");
  console.log("form:", form);

  if (!form) {
    alert("Form not found! Check id='contactForm'");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Submit event fired ✅");

    const name = document.getElementById("name")?.value || "";
    const message = document.getElementById("message")?.value || "";

    emailjs
      .send("service_u6hqtnj", "template_aszlqeq", {
        name: name,
        message: message, })
      .then(() => alert("SUCCESS ✅"))
      .catch((err) => alert("FAILED ❌ " + (err.text || JSON.stringify(err))));
  });

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



