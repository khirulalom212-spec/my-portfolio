window.addEventListener("DOMContentLoaded", function() {

  const btn = document.getElementById("contactBtn");
  const form = document.getElementById("contactForm");

  if(btn) {
    btn.addEventListener("click", function() {
      alert("Thank you for contacting me!");
    });
  }

  if(form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      alert("Thanks " + name + ", your message has been sent!");
    });
  }

});

