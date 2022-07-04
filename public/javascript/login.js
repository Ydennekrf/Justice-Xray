async function loginLogic(event) {
    event.preventDefault();
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    if (email && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert ('un able to login');
        }
    }
};

document.querySelector('.login').addEventListener('submit', loginLogic);