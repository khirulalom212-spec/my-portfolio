document.addEventListener("DOMContentLoaded", function () {

  const contactBtn = document.getElementById("contactBtn");
  const contactForm = document.getElementById("contactForm");

  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      alert("Thanks for contacting me!");
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_u6hqtnj", "tamplate_aszlqeq", {
    name: name,
    message: message,
  })
  .then(function() {
    alert("Message sent successfully!");
    contactForm.reset();
  }, function(error) {
    alert("Failed to send message");
  });
});

    return;
  }
      e.preventDefault();
      const name = document.getElementById("name").value;
      alert("Thanks " + name + ", your message has been sent!");
    });
  

