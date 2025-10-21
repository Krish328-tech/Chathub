window.onload = function() {
    loadUserData();
};

function loadUserData() {
    const userArr = JSON.parse(localStorage.getItem('users')) || []; 

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    userArr.forEach((user, index) => {
        const row = document.createElement('tr');
        const emailCell = document.createElement('td');
        const passwordCell = document.createElement('td');
        const actionCell = document.createElement('td'); 
        emailCell.textContent = user.email; 
        passwordCell.textContent = user.password; 

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = '#f44336'; // Red color for delete button
        deleteButton.style.color = 'white';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.border = 'none';
        deleteButton.style.cursor = 'pointer';

        // Add click event to delete user
        deleteButton.onclick = function() {
            deleteUser(index); // Pass the index to delete the correct user
        };

        actionCell.appendChild(deleteButton);

        row.appendChild(emailCell);
        row.appendChild(passwordCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1); // Remove the user at the given index
    localStorage.setItem('users', JSON.stringify(users)); // Save the updated user list
    loadUserData(); // Reload the table to reflect the changes
}
