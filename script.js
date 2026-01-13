document.addEventListener("DOMContentLoaded", function () {

  const contactBtn = document.getElementById("contactBtn");
  const contactForm = document.getElementById("contactForm");

  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      alert("Thanks for contacting me!");
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
  if (name.trim() === "") {
    alert("please Enter your name");
    return;
  }
      e.preventDefault();
      const name = document.getElementById("name").value;
      alert("Thanks " + name + ", your message has been sent!");
    });
  }

});

