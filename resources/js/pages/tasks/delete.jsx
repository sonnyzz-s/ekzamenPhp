
export default function Delete({ taskId, onDeleted }) {

    async function deleteTask() {

        if (!confirm('delete task?')) {
            return;
        }

        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            onDeleted();
        } 
        else {
            alert(data.message || 'error');
        }
    }

    return (
        <button onClick={deleteTask} className="rounded bg-red-500 px-4 py-2 text-white" > delete </button>
    );
}

