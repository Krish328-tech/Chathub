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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = '#f44336';
        deleteButton.style.color = 'white';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.border = 'none';
        deleteButton.style.cursor = 'pointer';

        deleteButton.onclick = function() {
            deleteUser(index); 
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
    users.splice(index, 1); 
    localStorage.setItem('users', JSON.stringify(users));
    loadUserData();
}
