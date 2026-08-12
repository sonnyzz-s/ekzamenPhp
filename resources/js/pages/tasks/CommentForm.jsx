import { useState } from 'react';

export default function CommentForm({ taskId, onCreated }) {

    const [text, setText] = useState('');

    async function addComment(e) {
        e.preventDefault();

        const response = await fetch('/api/comments', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                task_id: taskId,
                text: text
            })
        });

        const data = await response.json();

        if (response.ok) {
            setText('');
            onCreated(data);
        } 
        else {
            alert(data.message || 'error');
        }
    }

    return (
        <form  onSubmit={addComment} className="space-y-3" >

            <textarea value={text}  onChange={(e) => setText(e.target.value)} placeholder="comment" className="w-full rounded border px-3 py-2" />

            <button type="submit"className="rounded bg-blue-500 px-4 py-2 text-white">add comment</button>

        </form>
    );
}