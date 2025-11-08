// Toggle the user profile dropdown menu
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.style.display = dropdown.style.display === "none" || dropdown.style.display === "" ? "block" : "none";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.fa-circle-user')) {
        var dropdown = document.getElementById("myDropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}

// Open the modal with an animation
function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close the modal with an animation
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 800);
}

// Handle the login process
function handleLogin(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var userArr = JSON.parse(localStorage.getItem('users')) || [];
    var storedUser = userArr.find(user => user.email === email && user.password === password);

    if (storedUser) {
        alert("Login successful! Welcome back.");
        window.location.href = 'Chat.html';
    } else {
        alert("Error: Account does not exist or incorrect password.");
    }
}

// Switch to the signup form in the modal
function showSignupForm() {
    document.getElementById('modalHeading').innerText = 'Create an Account';
    document.getElementById('toggleMessage').innerHTML = `
        <span class="account">Already have an account? </span>
        <a id="loginLink" onclick="showLoginForm()">Login</a>
    `;
    document.getElementById('loginForm').innerHTML = `
        <input type="email" id="signupEmail" name="email" placeholder="&#x2709; Email" required>
        <div class="password-container">
            <input type="password" id="signupPassword" name="password" placeholder="Password" required>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required>
        </div>
        <button type="submit" class="login-btn" onclick="handleSignup(event)">Sign Up</button>
    `;
    document.getElementById('socialLogin').style.display = 'none';
}

// Handle the signup process
function handleSignup(event) {
    event.preventDefault();
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    var userArr = JSON.parse(localStorage.getItem('users')) || [];
    var existingUser = userArr.find(user => user.email === email);

    if (existingUser) {
        alert('Account already exists!');
    } else {
        userArr.push({ email, password });
        localStorage.setItem('users', JSON.stringify(userArr));
        alert('Sign-up successful! You can now log in.');
        showLoginForm();
    }
}

// Switch to the login form in the modal
function showLoginForm() {
    document.getElementById('modalHeading').innerText = 'Welcome Back';
    document.getElementById('toggleMessage').innerHTML = `
        <span class="account">Don't have an account yet? </span>
        <a id="signupLink" onclick="showSignupForm()">Sign up for Chathub</a>
    `;
    document.getElementById('loginForm').innerHTML = `
        <input type="email" id="email" name="email" placeholder="&#x2709; Email" required>
        <div class="password-container">
            <input type="password" id="password" name="password" placeholder="Password" required>
        </div>
        <button type="submit" class="login-btn" onclick="handleLogin(event)">Login</button>
    `;
    document.getElementById('socialLogin').style.display = 'block';
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    var modalContent = document.querySelector('.modal-content');
    
    if (event.target == modal && !modalContent.contains(event.target)) {
        closeModal();
    }
};
// // // Select the element where the contact name is displayed
// // const contactNameDisplay = document.getElementById('contact-name-display');

// // // Add event listeners to each contact
// // const contacts = document.querySelectorAll('.contact-item');
// // contacts.forEach(contact => {
// //     contact.addEventListener('click', () => {
// //         // Get the name of the clicked contact
// //         const contactName = contact.querySelector('.contact-name').innerText;
        
// //         // Update the right side with the selected contact's name
// //         contactNameDisplay.innerText = contactName;
// //     });
// // });

// // // Default name display for initial load
// // contactNameDisplay.innerText = "Krish";
// // Selecting elements in the left sidebar and chat header area
// const contacts = document.querySelectorAll('.Name'); // Assuming each contact has a 'contact' class
// const chatHeaderName = document.querySelector('.Name-Top'); // Replace with your header name class
// const chatHeaderImage = document.querySelector('.cover'); // Replace with your header image selector

// // Add click event listener to each contact in the list
// contacts.forEach(contact => {
//   contact.addEventListener('click', () => {
//     // Extract the name and image URL from the clicked contact
//     const contactName = contact.querySelector('.name').textContent; // Adjust selector if needed
//     const contactImageSrc = contact.querySelector('img').src;

//     // Update the right-side chat header with selected contact’s details
//     chatHeaderName.textContent = contactName; // Set name
//     chatHeaderImage.src = contactImageSrc; // Set profile image

//     // Additional: You may want to add an 'active' class to the selected contact for styling
//     contacts.forEach(c => c.classList.remove('active'));
//     contact.classList.add('active');
//   });
// });
