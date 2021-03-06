async function deletePost(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id: id}),
        headers: { 'Content-Type': 'application/json'}
    })
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('unable to delete');
    }
}

document.querySelector('.delete-post').addEventListener('click', deletePost);