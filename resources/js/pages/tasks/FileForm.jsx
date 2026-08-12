import { useState } from 'react';

export default function FileForm({ taskId, onCreated }) {
    const [file, setFile] = useState(null);

    async function uploadFile(e) {
        e.preventDefault();

        if (!file) {
            alert('choose file');
            return;
        }

        const formData = new FormData();

        formData.append('task_id', taskId);
        formData.append('file', file);

        const response = await fetch('/api/files', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            setFile(null);
            e.target.reset();

            onCreated(data);
        } 
        else {
            alert(data.message || 'error');
        }
    }

    return (
        <form onSubmit={uploadFile} className="mt-4 flex gap-2">

            <input  type="file"  onChange={(e) => setFile(e.target.files[0])} />

            <button type="submit" className="rounded bg-green-500 px-5 py-2 text-white"  > Upload </button>

        </form>
    );
}