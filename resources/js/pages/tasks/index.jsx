import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tasks, search, period }) {
    const [value, setValue] = useState(search || '');

    function searchTasks(e) {
        e.preventDefault();

        router.get('/tasks', {search: value,period: period});
    }

    function filterTasks(period) {
        router.get('/tasks', {search: value,period: period});
    }

    return (
        <>
            <Head title="tasks" />

                <div className="mx-auto max-w-4xl p-6">

                <h1 className="mb-5 text-3xl font-bold">tasks</h1>

                <form onSubmit={searchTasks} className="mb-4 flex gap-2">

                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 rounded border px-3 py-2"/>

                <button type="submit"className="rounded bg-blue-500 px-4 py-2 text-white">find task</button>

                </form>

                <div className="mb-6 flex gap-2">

                <button onClick={() => filterTasks('day')}className="rounded border px-3 py-2 hover:bg-gray-100">day</button>

                <button onClick={() => filterTasks('week')}className="rounded border px-3 py-2 hover:bg-gray-100"> week</button>

                <button onClick={() => filterTasks('month')}className="rounded border px-3 py-2 hover:bg-gray-100">month</button>

                <button onClick={() => filterTasks('year')}className="rounded border px-3 py-2 hover:bg-gray-100">year</button>

                <button onClick={() => filterTasks(null)}className="rounded border px-3 py-2 hover:bg-gray-100">all tasks</button>

                </div>

                <div className="space-y-4">

                    {tasks.data.map((task) => (
                        <div key={task.id}className="rounded border p-4 shadow-sm">

                            <h2 className="mb-2 text-xl font-bold">{task.title}</h2>

                            <p><b>priority:</b> {task.priority} </p>

                            <p><b>end date:</b> {task.end_date}</p>

                            <p><b>description:</b> {task.description}</p>

                            <p className="mt-2 text-blue-500"><b>hashtag:</b> {task.hashtag}</p>

                        </div>
                    ))}

                </div>

            </div>
        </>
    );
}