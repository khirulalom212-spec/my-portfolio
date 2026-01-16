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
      .send("service_u6hqtnj", "template_aszlqeq", { name, message })
      .then(() => alert("SUCCESS ✅"))
      .catch((err) => alert("FAILED ❌ " + (err.text || JSON.stringify(err))));
  });
});
