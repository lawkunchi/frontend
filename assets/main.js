// Initialize a new Bootstrap modal for registration
const registerModal = new bootstrap.Modal(document.getElementById('registrationModal'), {});

// FormValidator class for handling form validation
class FormValidator {
    // Constructor takes formId as parameter
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.currentStep = 1;
    }

    // Method to go to the next step of the form
    nextStep() {
        if (this.validateForm()) {
            this.hideStep(this.currentStep);
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    }

    // Method to hide a step
    hideStep(step) {
        document.getElementById('step' + step).style.display = 'none';
    }

    // Method to show a step
    showStep(step) {
        // If the current step is greater than 3, hide the modal
        if (this.currentStep > 3) {
            registerModal.hide();
        }
        else {
            document.getElementById('step' + step).style.display = 'block';
        }
    }

    // Method to validate the form
    validateForm() {
        let isValid = true;

        // Validate fields based on the current step
        if (this.currentStep === 1) {
            isValid = this.validate(['gender', 'lookingForGender'], 'field', { gender: 'Gender is required', lookingForGender: 'Looking for gender is required' });
        } else if (this.currentStep === 2) {
            isValid = this.validate(['username', 'dob'], 'field', { username: 'Username is required', dob: 'Date of birth is required' });
        } else if (this.currentStep === 3) {
            isValid = this.validate(['email'], 'email', { email: 'Invalid email' }) && this.validate(['password'], 'password', { password: 'Password must be at least 8 characters long' }) && this.validate(['tacAccepted'], 'checkbox', { tacAccepted: 'You must accept the terms and conditions' });
        }

        return isValid;
    }

    // Method to validate a set of fields
    validate(ids, type, errorMessages) {
        let isValid = true;
        // Regular expression for email validation
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        ids.forEach(id => {
            // Get the element and its corresponding error field
            const element = document.getElementById(id);
            const errorField = document.getElementById(id + 'Error');

            // Function to set error
            const setError = () => {
                errorField.textContent = errorMessages[id];
                errorField.style.display = 'block';
                isValid = false;
            };

            // Validate the element based on its type
            if (type === 'field' && !element.value) {
                setError();
            } else if (type === 'email' && !emailRegex.test(String(element.value).toLowerCase())) {
                setError();
            } else if (type === 'password' && (element.value.length < 8)) {
                setError();
            } else if (type === 'checkbox' && !element.checked) {
                setError();
            } else {
                // If no error, hide the error field
                errorField.style.display = 'none';
            }
        });

        return isValid;
    }
}

// CountdownTimer class for handling countdown timer
class CountdownTimer {
    // Constructor takes elementId and minutes as parameters
    constructor(elementId, minutes) {
        // Initialize time and timerElement
        this.time = minutes * 60;
        this.timerElement = document.getElementById(elementId);
        this.intervalId = null;
    }

    // Method to start the timer
    start() {
        // Start the countdown

        this.intervalId = setInterval(() => {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;

            // Display the timer
            this.timerElement.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            // Change the color and blink when less than 1 minute remains
            if (this.time < 60) {
                this.timerElement.style.color = 'red';
                this.timerElement.style.animation = 'blink 1s infinite';
            }

            // Stop the countdown when time is up
            if (this.time === 0) {
                this.stop();
            }

            this.time--;
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }
}

// Create a new CountdownTimer instance for the 'timer' element, set for 5 minutes
const timer = new CountdownTimer('timer', 5);
// Start the timer
timer.start();

// Create a new FormValidator instance for the 'registrationForm' form
const formValidator = new FormValidator('registrationForm');

// Add a click event listener to the 'nextButton' button
document.getElementById('nextButton').addEventListener('click', () => {
    formValidator.nextStep()
});

// Add a click event listener to the 'register' button
document.getElementById('register').addEventListener('click', () => {
    registerModal.show();
});