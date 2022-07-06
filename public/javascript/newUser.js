async function newUser(event) {
    event.preventDefault();

    const username = document.querySelector('#username-new').value.trim();
    const email = document.querySelector('#email-new').value.trim();
    const password = document.querySelector('#password-new').value.trim();

    if( username&&email&&password) {
        const response = await fetch('/api/user/new', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log('creating user')
            document.location.replace('/dash');
        } else {
            alert(' unable to create new user ');
        }
    }
};

document.querySelector('.user-new').addEventListener('click', newUser);