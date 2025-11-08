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
        window.location.href = '../../pages/Chat.html';
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
};// Initialize messages array from localStorage or as an empty array
// Initialize messages array from localStorage or as an empty array
// Initialize messages array from localStorage or as an empty array
// Initialize all messages object from localStorage or as an empty object
let allMessages = JSON.parse(localStorage.getItem('allMessages')) || {};
let currentContact = null;

// Define specific responses for particular phrases
const keywordResponses = {
    "Hello": "Aur Bhai Kaisa hai",
    "Help": "Bro call emergency sevices 6969",
    "Thank You": "Your's welcome",
    "Bye": "Ja ja Chala ja ",
    "Kaisa hai": "Bakwas tu apna bta",
    "What is your name": "I'm Chathub, Here to replace whatsapp😎"
};

// Default responses when no keyword is matched
const defaultResponses = [
    "Kehna kya chahta hai?????",
    "Ram Ram Bhai🙏",
    "I'm not sure what you mean, could you explain further?",
    "Thank you for reaching out CHATHUB!"
];

// Function to handle contact selection
function selectContact(contactElement) {
    const contactName = contactElement.querySelector('.Name').textContent;
    const contactImage = contactElement.querySelector('.imgbx img').src;

    currentContact = contactName;

    // Update header with selected contact details
    document.querySelector('.Name-Top').innerHTML = `${contactName} <br><span>Online</span>`;
    document.querySelector('.header .imgtext img').src = contactImage;

    // Clear chatbox and load messages for the selected contact
    document.querySelector('.chatbox').innerHTML = '';
    loadMessages();
}

// Function to send a user message
function sendMessage() {
    if (!currentContact) {
        console.log("No contact selected");
        return;
    }

    const inputField = document.querySelector('.chatbox_input input');
    const message = inputField.value.trim();

    if (message === '') return;

    // Create user message object
    const messageObject = {
        id: Date.now(),
        text: message,
        time: getCurrentTime(),
        sender: 'user'
    };

    // Ensure messages array for the current contact exists
    allMessages[currentContact] = allMessages[currentContact] || [];
    allMessages[currentContact].push(messageObject);
    localStorage.setItem('allMessages', JSON.stringify(allMessages));

    // Display user message
    displayMessage(messageObject);

    // Update last message in sidebar
    updateLastMessageInSidebar(currentContact);

    // Clear input field
    inputField.value = '';

    // Show typing animation before bot response
    showTypingAnimation();

    // Simulate bot response after a short delay
    setTimeout(() => {
        hideTypingAnimation();
        simulateBotResponse(message);
    }, 1000);
}

// Function to simulate bot responses based on keyword matching
function simulateBotResponse(userMessage) {
    let response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

    // Check if any keyword matches the user message
    for (const keyword in keywordResponses) {
        if (userMessage.includes(keyword)) {
            response = keywordResponses[keyword];
            break;
        }
    }

    // Create bot message object
    const botMessage = {
        id: Date.now() + 1, // Unique ID for bot message
        text: response,
        time: getCurrentTime(),
        sender: 'friend'
    };

    // Store bot message in array and localStorage
    allMessages[currentContact].push(botMessage);
    localStorage.setItem('allMessages', JSON.stringify(allMessages));

    // Display bot message
    displayMessage(botMessage);

    // Update last message in sidebar
    updateLastMessageInSidebar(currentContact);
}

// Function to show the typing animation
function showTypingAnimation() {
    const messagesContainer = document.querySelector('.chatbox');

    const typingElement = document.createElement('div');
    typingElement.classList.add('typing', 'frnd_message');
    typingElement.setAttribute('id', 'typing-indicator');
    typingElement.innerHTML = `<p>Typing<span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span></p>`;

    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to hide the typing animation
function hideTypingAnimation() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to display a message in the chat
function displayMessage(messageObject) {
    const messagesContainer = document.querySelector('.chatbox');

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', messageObject.sender === 'user' ? 'my_message' : 'frnd_message');
    messageElement.dataset.id = messageObject.id; // Store message ID for deletion

    messageElement.innerHTML = `
        <p>${messageObject.text}<br><span>${messageObject.time}</span></p>
        <button class="delete-btn" onclick="deleteMessage(${messageObject.id})">
            <ion-icon name="trash-outline"></ion-icon>
        </button>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to update the last message and time in the sidebar for a contact
function updateLastMessageInSidebar(contactName) {
    const contactElements = document.querySelectorAll('.chatlist .block');
    const lastMessage = allMessages[contactName]?.slice(-1)[0];

    contactElements.forEach(contactElement => {
        const nameElement = contactElement.querySelector('.Name');
        if (nameElement && nameElement.textContent === contactName && lastMessage) {
            contactElement.querySelector('.message_p p').textContent = lastMessage.text;
            contactElement.querySelector('.time').textContent = lastMessage.time;
        }
    });
}

// Load messages from localStorage for the current contact
function loadMessages() {
    const messages = allMessages[currentContact] || [];
    messages.forEach(displayMessage);
}

// Function to delete a message
function deleteMessage(id) {
    if (!currentContact) return;

    // Remove message from array
    allMessages[currentContact] = allMessages[currentContact].filter(message => message.id !== id);
    localStorage.setItem('allMessages', JSON.stringify(allMessages));

    // Remove message from DOM
    const messageElement = document.querySelector(`.message[data-id="${id}"]`);
    if (messageElement) {
        messageElement.remove();
    }
}

// Function to get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Event listener for send button click
document.querySelector('.chatbox_input ion-icon[name="send-sharp"]').addEventListener('click', sendMessage);

// Event listener for pressing "Enter" key
document.querySelector('.chatbox_input input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Event listeners for contact selection
document.querySelectorAll('.chatlist .block').forEach(contact => {
    contact.addEventListener('click', () => selectContact(contact));
});

// Load messages on page load
if (currentContact) {
    loadMessages();
}
// Function to show the typing animation
function showTypingAnimation() {
    const messagesContainer = document.querySelector('.chatbox');

    const typingElement = document.createElement('div');
    typingElement.classList.add('typing', 'frnd_message');
    typingElement.setAttribute('id', 'typing-indicator');
    typingElement.innerHTML = `
        <div class="typing-bubble">
            <span class="dot dot1"></span>
            <span class="dot dot2"></span>
            <span class="dot dot3"></span>
        </div>
    `;

    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
// List of explicit words
const explicitWords = ["ban", "man", "pan"]; // Add more words as necessary

// Initialize user warning data in localStorage
let userWarnings = JSON.parse(localStorage.getItem('userWarnings')) || {};

// Function to check for explicit words in a message
function containsExplicitWords(message) {
    return explicitWords.some(word => message.includes(word.toLowerCase()));
}

// Function to handle warnings and block the user
function handleExplicitWords(message) {
    const userId = currentContact; // Assuming `currentContact` is the user's identifier

    if (!userWarnings[userId]) {
        userWarnings[userId] = { count: 0 };
    }

    // Check if message contains explicit words
    if (containsExplicitWords(message)) {
        // Increment the warning count for the user
        userWarnings[userId].count++;

        // Show warning message at the top of the chat
        alert(`Warning: Please do not use explicit language. You have ${3 - userWarnings[userId].count} warnings left.`);

        // If the user has received 3 warnings, block them
        if (userWarnings[userId].count >= 3) {
            alert("You have been Kicked from Chathub due to repeated use of explicit language.");
            window.location.href = "../../index.html";
            return true; // Stop further processing of this message
        }

        // Save warning data to localStorage
        localStorage.setItem('userWarnings', JSON.stringify(userWarnings));
        return true;
    }

    return false;
}
// Function to kick the user (delete email and password from localStorage)
// Function to kick the user (delete email and password from localStorage)
// Function to kick the user (delete email and password from localStorage)
// Function to kick the user (delete email and password from localStorage)
function kickUser(email) {
    // Get the users array from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the index of the user by their email
    const userIndex = users.findIndex(user => user.email === email);

    // If the user exists, remove them
    
}



// Function to send a user message
function sendMessage() {
    if (!currentContact) {
        console.log("No contact selected");
        return;
    }

    const inputField = document.querySelector('.chatbox_input input');
    const message = inputField.value.trim();

    if (message === '') return;

    // Check if the message contains explicit words
    if (handleExplicitWords(message)) {
        inputField.value = ''; // Clear the input field after a warning or kick
        return; // Stop sending the message if it's explicit
    }

    // Create user message object
    const messageObject = {
        id: Date.now(),
        text: message,
        time: getCurrentTime(),
        sender: 'user'
    };

    // Ensure messages array for the current contact exists
    allMessages[currentContact] = allMessages[currentContact] || [];
    allMessages[currentContact].push(messageObject);
    localStorage.setItem('allMessages', JSON.stringify(allMessages));

    // Display user message
    displayMessage(messageObject);

    // Update last message in sidebar
    updateLastMessageInSidebar(currentContact);

    // Clear input field
    inputField.value = '';

    // Show typing animation before bot response
    showTypingAnimation();

    // Simulate bot response after a short delay
    setTimeout(() => {
        hideTypingAnimation();
        simulateBotResponse(message);
    }, 1000);
}
