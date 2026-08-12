import { useState } from 'react';

export default function SubTask({ taskId, onCreated }) {
const [title, setTitle] = useState('');
const [priority, setPriority] = useState('normal');
const [endDate, setEndDate] = useState('');
const [description, setDescription] = useState('');
const [hashtag, setHashtag] = useState('');

async function createSubTask(e) {
    e.preventDefault();

    const response = await fetch('/api/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            parent_id: taskId,
            title: title,
            priority: priority,
            end_date: endDate,
            description: description,
            hashtag: hashtag
        })
    });

    const data = await response.json();


    if (response.ok) {
        setTitle('');
        setPriority('normal');
        setEndDate('');
        setDescription('');
        setHashtag('');

        onCreated(data);
    } 
    else {
        alert(JSON.stringify(data));
    }
}

return (
    <form onSubmit={createSubTask} className="space-y-3 rounded border p-5">

        <h3 className="text-xl font-bold">add subtask</h3>

        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border px-3 py-2" />

        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full rounded border px-3 py-2">
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
        </select>

        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded border px-3 py-2" />

        <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border px-3 py-2" />

        <input type="text" placeholder="hashtag" value={hashtag} onChange={(e) => setHashtag(e.target.value)} className="w-full rounded border px-3 py-2" />

        <button type="submit" className="rounded bg-green-500 px-5 py-2 text-white">add subtask</button>

    </form>
);
}