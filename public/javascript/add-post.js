async function addPost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_txt = document.querySelector('input[name="post-txt"]').value;

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title, post_txt
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log("unable to add post");
    }
}

document.querySelector('.newPostForm').addEventListener('submit', addPost);