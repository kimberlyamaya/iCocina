async function commentFormHandler(event) {
    event.preventDefault();
    //const commentTitle = document.querySelector('input[name="commentTittle"]').value;
    const comment_text = document.querySelector('textarea[name="commentBody"]').value.trim();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    if (comment_text && id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/jason'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);