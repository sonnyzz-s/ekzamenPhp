<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Все задачи
    public function index(Request $request)
    {
        $query = Task::with(['subTasks', 'comments', 'files']);

        // Поиск
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%') ->orWhere('description', 'like', '%' . $request->search . '%')->orWhere('hashtag', 'like', '%' . $request->search . '%');
        }

        // День
        if ($request->period == 'day') {
            $query->whereDate('end_date', today());
        }

        // Неделя
        if ($request->period == 'week') {
            $query->whereBetween('end_date', [now(), now()->addWeek()]);
        }

        // Месяц
        if ($request->period == 'month') {
            $query->whereBetween('end_date', [now(), now()->addMonth()]);
        }

        // Год
        if ($request->period == 'year') {
            $query->whereBetween('end_date', [now(), now()->addYear()]);
        }

        return response()->json(
            $query->orderBy('end_date')->paginate(10)
        );
    }

    public function show($id)
    {
        $task = Task::with(['subTasks', 'comments', 'files'])->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'task not found'], 404);
        }

        return response()->json($task);
    }

    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = auth()->id();

        $task = Task::create($data);

        return response()->json($task, 201);
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'task not found'], 404);
        }

        $task->update($request->validated());

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'task deleted'
        ]);
    }
}