document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    console.log("Form not found: check id='contactForm'");
    return;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameEl = document.getElementById("name");
    const msgEl = document.getElementById("message");

    const name = nameEl ? nameEl.value : "";
    const message = msgEl ? msgEl.value : "";

    emailjs
      .send("service_u6hqtnj", "template_aszlqeq", { name, message })
      .then(function () {
        alert("Thanks " + name + ", your message has been sent!");
        contactForm.reset();
      })
      .catch(function (error) {
        console.log(error);
        alert("Failed to send message");
      });
  });
});

