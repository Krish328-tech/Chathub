# ChatHub

ChatHub is a responsive web-based chat application built using HTML, CSS, and JavaScript. It demonstrates user authentication, frontend data storage, modular navigation, and simulated messaging without using external JavaScript libraries.

---

## 1. Overview

This project provides a multi-page chat interface with features like login, signup, chat simulation, user bans, and message storage using browser-based Web Storage (localStorage).

---

## 2. Features

### Authentication
- Signup restricted to Gmail accounts only (`*@gmail.com`).
- Login session validation using `localStorage`.
- Redirects to login page if a user tries to access `Chat.html` without logging in.
- Logout functionality clears session and returns to home.

### Chat System
- Contact list with simulated users.
- Message send/receive structure with timestamps.
- Message delete option.
- Auto-scrolling, typing animation simulation.

### Bot Response
- Keyword-based responses.
- Random fallback responses if no keyword is matched.

### Ban and Warning System
- Detects defined inappropriate words.
- Issues warnings to the user.
- After 3 warnings:
  - User is banned.
  - Email added to `bannedUsers` in localStorage.
  - User removed from the registered list.
  - User is logged out and denied future login access.

### Data Management
- Uses `localStorage` for:
  - Users
  - Messages
  - Chat history
  - Warnings and bans
- Session handling using:
  - `isLoggedIn`
  - `currentUser`

### Frontend UI
- Mobile-first responsive design.
- Multiple HTML pages:
  - `index.html` – Login/Signup
  - `pages/Chat.html` – Chat Interface
  - `pages/About.html`, `pages/Privacy.html`
- No external libraries used for JavaScript logic.

---

## 3. Folder Structure
ChatHub/
│
├── assets/
│ ├── css/
│ │ ├── style.css
│ │ ├── Chat.css
│ │ └── ...
│ ├── js/
│ │ └── script.js
│ └── images/
│ └── ...
│
├── pages/
│ ├── Chat.html
│ ├── About.html
│ ├── Privacy.html
│ └── ...
│
├── index.html
├── README.md
└── ...

---

## 4. How to Run

1. Download or clone the repository.
2. Open `index.html` in any web browser.
3. Create an account using a valid Gmail address.
4. Log in to access the chat page.
5. Interact with the chat interface.

---

## 5. LocalStorage Keys Used

| Key Name        | Purpose                                              |
|-----------------|------------------------------------------------------|
| `users`         | Stores registered users (`email`, `password`)       |
| `isLoggedIn`    | Stores login session status                         |
| `currentUser`   | Stores the email of the logged-in user              |
| `allMessages`   | Stores chat history per contact                     |
| `userWarnings`  | Tracks warning count per user                       |
| `bannedUsers`   | Stores list of banned user email addresses          |

---

## 6. Future Enhancements

- Add backend using Node.js and database.
- Implement real-time messaging using WebSockets or Firebase.
- Add password hashing and encryption.
- Introduce group chat rooms and profile customization.
- Admin dashboard for managing users and bans.

---

## 7. License

This project is open-source for personal, educational, and learning purposes. Contact the author for commercial or extended use.

