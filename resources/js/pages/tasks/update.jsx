
import { useState } from 'react';

export default function Update({ task, onUpdated }) {

    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [endDate, setEndDate] = useState(task.end_date);
    const [description, setDescription] = useState(task.description || '');
    const [hashtag, setHashtag] = useState(task.hashtag || '');

    async function updateTask(e) {
        e.preventDefault();

        const response = await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                priority: priority,
                end_date: endDate,
                description: description,
                hashtag: hashtag
            })
        });

        const data = await response.json();

        if (response.ok) {
            onUpdated(data.task);
        } 
        else {
            alert(data.message || 'error');
        }
    }

    return (
        <form onSubmit={updateTask} className="space-y-4">

            <div>
                <label>title</label>

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}className="w-full rounded border px-3 py-2"/>
            </div>

            <div>
                <label>priority</label>

                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full rounded border px-3 py-2" >
                    <option value="low">low</option>
                    <option value="normal">normal</option>
                    <option value="high">high</option>
                </select>
            </div>

            <div>
                <label>end date</label>

                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded border px-3 py-2" />
            </div>

            <div>
                <label>description</label>

                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border px-3 py-2" />
            </div>

            <div>
                <label>hashtag</label>

                <input type="text" value={hashtag} onChange={(e) => setHashtag(e.target.value)} className="w-full rounded border px-3 py-2" />
            </div>

            <button type="submit" className="rounded bg-blue-500 px-5 py-2 text-white"> save</button>

        </form>
    );
}

