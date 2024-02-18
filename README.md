# Landing page with a registration form

This project is a comprehensive web application featuring a countdown timer, a login button, a two-column banner, and a multi-step registration form. The application is designed with extensibility and reusability in mind, with key functionalities encapsulated in dedicated classes.

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have a modern web browser installed (e.g., Google Chrome, Mozilla Firefox).

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and open the `index.html` file in your web browser.

## Features

1. **Navbar**: Contains a countdown timer element and a login button.
2. **Banner**: A two-column layout with an image and text, along with a button that triggers the registration form.
3. **Registration Form**: A three-step form that validates user input and displays errors for incorrect field values. The modal closes upon successful registration.

## Design Notes

1. **FormValidator Class**: Located in the `assets/main.js` file, this class is responsible for validating the registration form. It is designed to be extensible for future validation needs.
2. **Countdown Class**: Also located in the `assets/main.js` file, this class handles the countdown functionality. It is designed to be reusable across different parts of the application.