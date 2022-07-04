async function editPost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_txt = document.querySelector('input[name="post-txt"]').value;
    const id = window.location.toString().split('/')[window.location.toString().split('/') - 1];
    const response = await fetch(`api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_txt }),
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert(' unable to edit post');
    }
};

document.querySelector('.edit-post').addEventListener('submit', editPost);
