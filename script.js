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

});
