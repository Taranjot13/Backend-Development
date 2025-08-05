function getUsers(URL){
    fetch(URL)
        .then(res => {
            console.log(res);
            return res.json();
    })
    .then((data) => {
            console.log(data);
            data.forEach(user => {
                displayUsers(user);                
            });
    })
    .catch((err) => {
        console.error(err);
    })
}

getUsers("https://localhost:3001/users");

function displayUsers(users) {
    let li = document.createElement("li");
    li.className = "user-item";
    li.innerHTML = `<div class="user-info">
                <h1>${users.name}</h1>
                <p>${users.email}</p>
                
            </div>
            <div class="user-btn">
                <button class="delete-btn">❌</button>
                <button class="edit-btn">✏️</button>
            </div>`;
    user-container.appendChild(li)
}