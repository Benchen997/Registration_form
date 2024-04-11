document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {

        // get DOM elements:
        const email = document.getElementById('email').value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const password = document.getElementById('password').value;
        const confirmPwd = document.getElementById('confirm_password').value;
        const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/;

        //check email standard
        if (!emailPattern.test(email)) {
            alert('Invalid email address');
            event.preventDefault(); // Prevent form submission
            return; // Exit the function
        }

        //check password standard
        if (!passwordPattern.test(password)) {
            alert('Password must contain at least one number, one uppercase and lowercase letter, one special character, and at least 8 or more characters.');
            event.preventDefault(); // Prevent form submission
            return; // Exit the function
        }
        if (password != confirmPwd) {
            alert('Passwords do not match');
            event.preventDefault(); // Prevent form submission
            return; // Exit the function
        }

        // Create an object to store form data
        const formData = {};

        // Iterate over each form element and add its name and value to the formData object
        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];
            // Check if the element has a name attribute and is not a submit button
            if (element.name && element.type !== 'submit') {
                formData[element.name] = element.value;
            }
        }
        // Store the formData object in localStorage as a JSON string
        localStorage.setItem('formData', JSON.stringify(formData));

        // Redirect to submission.html
        window.location.href = 'submission.html';
    });
});

// Once redirected to submission.html, retrieve the form data from localStorage and log it to the console
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the formData from localStorage
    const formDataJSON = localStorage.getItem('formData');

    // Parse the JSON string back to an object
    const formData = JSON.parse(formDataJSON);

    // Log the form data
    console.log(formData);

    // Clear the stored form data to prevent it from being logged again on page reload
    localStorage.removeItem('formData');
});



