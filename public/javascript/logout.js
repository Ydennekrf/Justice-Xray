async function logOut() {
    console.log('logout?')
    const response = await fetch('api/user/logout', {
        method: "delete",
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        console.log('logout')
        document.location.replace('/');
    } else {
        alert(' unable to logout ');
    }
};

document.querySelector('#logout').addEventListener('click', logOut);
