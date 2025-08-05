function getUsers(URL){
    fetch(URL)
        .then(res => {
            console.log(res);
            return res.json();
    })
    .then((data) => {
            console.log(data);
    })
    .catch((err) => {
        console.error(err);
    })
}

getUsers("https://jsonplaceholder.typicode.com/users");

