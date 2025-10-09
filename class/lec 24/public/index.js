//signup feature
const signupForm = document.querySelector('#SignUp');
const signupUsername = document.querySelector('#signup-username');
const signupEmail = document.querySelector('#signup-email');
const signupPassword = document.querySelector('#signup-password');


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = signupUsername.value;
    let email = signupEmail.value;
    let password = signupPassword.value;
    let response = await    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            username: username, 
            email:email, 
            password:password }),
        headers: {  'Content-Type': 'application/json' }
    }) 
    let data = await response.json();
    console.log(data);
    if (data.success) {
        alert('Registration successful! Please log in.');
        signupForm.reset();
    } else {
        alert('Registration failed: ' + data.message);
    }
});
