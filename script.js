window.onload = function() {

  document.getElementById("contactBtn").addEventListener("click", function() {
    alert("Thank you for contacting me!");
  });

  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    alert("Thanks " + name + ", your message has been sent!");
  });

};

