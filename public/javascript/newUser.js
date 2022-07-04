async function newUser(event) {
    event.preventDefault();

    const username = querySelector('#username-new').value;
    const email = querySelector('#email-new').value;
    const password = querySelector('#password-new').value;

    if( username&&email&&password) {
        const response = await fetch('api/user', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert(' unable to create new user ');
        }
    }
};

document.querySelector('.user-new').addEventListener('submit', newUser);