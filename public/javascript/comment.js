async function addComment(event) {
    event.preventDefault();

    const comment_txt = document.querySelector('#comment-body').value;

   const post_id = window.location.toString().split('/')[ window.location.toString().split('/').length - 1];

   if (comment_txt) {
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({post_id, comment_txt}),
        headers: { 'Content=Type': 'application/json'}
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('failed to post comment')
    }
   }
}

document.querySelector('.comment-form').addEventListener('submit', addComment);