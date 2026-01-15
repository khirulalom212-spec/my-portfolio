const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;

        emailjs.send("service_u6hqtnj", "template_aszlqeq", {
            name: name,
            message: message
        }).then(function() {
            alert("Thanks " + name + ", your message has been sent!");
            contactForm.reset();
        }, function(error) {
            alert("Failed to send message");
            console.log(error);
        });
    });
}
