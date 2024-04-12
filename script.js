// To handle form submission, validate the form data, 
// store the form data in localStorage, and redirect to submission.html
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

// To handle animation effects on the form elements
{
    const progress = document.getElementById('progress')
    const prev = document.getElementById('prev')
    const next = document.getElementById('next')
    const circles = document.querySelectorAll('.circle')
    const cards = document.querySelectorAll('.card')

    let cardIndex = 0;
    cards[cardIndex].style.display = 'block';

    let currentActive = 1

    next.addEventListener('click', () => {
        currentActive++
        cardIndex++;
        if(currentActive > circles.length) {
            currentActive = circles.length
        }

        update()
        cardDisplay(cardIndex, "next");
    })

    prev.addEventListener('click', () => {
        currentActive--
        cardIndex--;
        if(currentActive < 1) {
            currentActive = 1
        }

        update()
        cardDisplay(cardIndex, "prev");
    })

    function cardDisplay(cardIndex, direction) {
        if (direction === 'next') {
            let lastIndex = cardIndex - 1;
            cards[lastIndex].style.display = 'none';
            cards[cardIndex].style.display = 'block';
        } 
        else if (direction === 'prev') {
            let nextIndex = cardIndex + 1;
            cards[nextIndex].style.display = 'none';
            cards[cardIndex].style.display = 'block';
        }

    }

    function update() {
        for (let i = 0; i < circles.length; i++) {
            if (i < currentActive) {
                circles[i].classList.add('active');             
            } else {
                circles[i].classList.remove('active');
            }
        }
    
        const actives = document.querySelectorAll('.active');
        progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
    
        if (currentActive === 1) {
            prev.disabled = true;
        } else if (currentActive === circles.length) {
            next.disabled = true;
        } else {
            prev.disabled = false;
            next.disabled = false;
        }
    }
     
}




