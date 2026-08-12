import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('normal');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [hashtag, setHashtag] = useState('');

    async function createTask(e) {
        e.preventDefault();

        const response = await fetch('/api/tasks', {
            method: 'POST',
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
           router.visit('/tasks');
        } 
        else {
            alert(data.message || 'error');
        }
    }
    return (
        <>
            <Head title="create task" />

            <div className="mx-auto max-w-2xl p-6">

                <h1 className="mb-6 text-3xl font-bold">create task</h1>

                <form onSubmit={createTask} className="space-y-4">

                    <div>
                        <label>title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border px-3 py-2" />
                    </div>

                    <div>
                        <label>priority</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full rounded border px-3 py-2">
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

                    <button type="submit" className="rounded bg-blue-500 px-5 py-2 text-white">create task</button>

                </form>

            </div>
        </>
    );
}