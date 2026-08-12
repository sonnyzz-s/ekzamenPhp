import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Update from './update';
import Delete from './delete';
import CommentForm from './CommentForm';
import FileForm from './FileForm';
import SubTask from './SubTask';

export default function Show({ task }) {
const [currentTask, setCurrentTask] = useState(task);

function updateTask(data) {
    setCurrentTask({
        ...currentTask,
        ...data
    });
}

function deleteTask() {
    router.visit('/tasks');
}

function addComment(data) {
    setCurrentTask({
        ...currentTask,
        comments: [...(currentTask.comments || []), data]
    });
}

function addFile(data) {
    setCurrentTask({
        ...currentTask,
        files: [...(currentTask.files || []), data]
    });
}

async function deleteComment(id) {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await response.json();

    if (response.ok) {
        setCurrentTask({
            ...currentTask,
            comments: currentTask.comments.filter(comment => comment.id !== id)
        });
    } else {
        alert(data.message || 'error');
    }
}

async function deleteFile(id) {
    const response = await fetch(`/api/files/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await response.json();

    if (response.ok) {
        setCurrentTask({
            ...currentTask,
            files: currentTask.files.filter(file => file.id !== id)
        });
    } else {
        alert(data.message || 'error');
    }
}

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
            parent_id: currentTask.id,
            title: e.target.title.value,
            priority: e.target.priority.value,
            end_date: e.target.end_date.value,
            description: e.target.description.value,
            hashtag: e.target.hashtag.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        setCurrentTask({
            ...currentTask,
            subTasks: [...(currentTask.subTasks || []), data]
        });

        e.target.reset();
    } else {
        alert(data.message || 'error');
    }
}

return (
    <>
        <Head title={currentTask.title} />

        <div className="mx-auto max-w-4xl p-6">

            <h1 className="mb-6 text-3xl font-bold">{currentTask.title}</h1>

            <div className="mb-8 rounded border p-5">

                <p><strong>Priority:</strong> {currentTask.priority}</p>

                <p><strong>End date:</strong> {currentTask.end_date}</p>

                <p><strong>Description:</strong> {currentTask.description}</p>

                <p><strong>Hashtag:</strong> {currentTask.hashtag}</p>

            </div>

            <div className="mb-8 rounded border p-5">

                <h2 className="mb-4 text-2xl font-bold">edit task</h2>

                <Update task={currentTask} onUpdated={updateTask} />

            </div>

            <div className="mb-8">

                <Delete taskId={currentTask.id} onDeleted={deleteTask} />

            </div>

            <div className="mb-8">

                <h2 className="mb-4 text-2xl font-bold">Subtasks</h2>

                {currentTask.subTasks?.length > 0 ? (
                    <div className="mb-5 space-y-2">

                        {currentTask.subTasks.map((subTask) => (
                            <div key={subTask.id} className="rounded border p-3">

                                <p className="font-bold">title: {subTask.title}</p>

                                <p>priority: {subTask.priority}</p>

                                <p>end date: {subTask.end_date}</p>

                                <p>description: {subTask.description}</p>

                                <p>hashtag: {subTask.hashtag}</p>

                            </div>
                        ))}

                    </div>
                ) : (
                    <p className="mb-5">No subtasks</p>
                )}

                <form onSubmit={createSubTask} className="space-y-3 rounded border p-5">

                    <h3 className="text-xl font-bold">add subtask</h3>

                    <input name="title" type="text" placeholder="Title" className="w-full rounded border px-3 py-2" />

                    <select name="priority" defaultValue="normal" className="w-full rounded border px-3 py-2">
                        <option value="low">low</option>
                        <option value="normal">normal</option>
                        <option value="high">high</option>
                    </select>

                    <input name="end_date" type="date" className="w-full rounded border px-3 py-2" />

                    <textarea name="description" placeholder="Description" className="w-full rounded border px-3 py-2" />

                    <input name="hashtag" type="text" placeholder="Hashtag" className="w-full rounded border px-3 py-2" />

                    <button type="submit" className="rounded bg-green-500 px-5 py-2 text-white">Add subtask</button>

                </form>

            </div>

            <div className="mb-8">

                <h2 className="mb-4 text-2xl font-bold">comments</h2>

                {currentTask.comments?.map((comment) => (
                    <div key={comment.id} className="mb-3 rounded border p-3">

                        <p>{comment.text}</p>

                        <button onClick={() => deleteComment(comment.id)} className="mt-2 rounded bg-red-500 px-3 py-1 text-white">Delete</button>

                    </div>
                ))}

                <CommentForm taskId={currentTask.id} onCreated={addComment} />

            </div>

            <div className="mb-8">

                <h2 className="mb-4 text-2xl font-bold">Files</h2>

                {currentTask.files?.map((file) => (
                    <div key={file.id} className="mb-3 flex items-center justify-between rounded border p-3">

                        <span>{file.path}</span>

                        <div className="flex gap-2">

                            <a href={`/api/files/${file.id}/download`} className="rounded bg-blue-500 px-3 py-1 text-white">Download</a>

                            <button onClick={() => deleteFile(file.id)} className="rounded bg-red-500 px-3 py-1 text-white">Delete</button>

                        </div>

                    </div>
                ))}

                <FileForm taskId={currentTask.id} onCreated={addFile} />

            </div>

            <a href="/tasks" className="rounded bg-gray-500 px-5 py-2 text-white">back to tasks</a>

        </div>
    </>
);
}