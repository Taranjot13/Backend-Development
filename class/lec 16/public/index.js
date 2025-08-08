// function getCommentData(){
//     axios.get("https://jsonplaceholder.typicode.com/comments")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })
// }
function getCommentData() {
    try{
        let response = axios.get("https://jsonplaceholder.typicode.com/comments");
        console.log(response.data);
    }
    catch (error) {
        console.error(error.message);
    }
}
getCommentData();

function adduser(email,password) {
    axios.post('/user', {
    email: email,
        password: password
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.message);
  })
  
}
adduser("65taranjot@gmail.com","12345");