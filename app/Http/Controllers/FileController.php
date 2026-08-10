<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Http\Requests\StoreFileRequest;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index($taskId)
    {
        $files = File::where('task_id', $taskId)->get();

        return response()->json($files);
    }

    public function store(StoreFileRequest $request)
    {
        $data = $request->validated();

        
        $path = $request->file('file')->store('tasks', 'public'); // сохраняет файл

        File::create([
            'task_id' => $data['task_id'],
            'user_id' => auth()->id(),
            'path' => $path
        ]);

        return response()->json([
            'message' => 'File uploaded',
            'path' => $path], 201);
    }

    public function download($id)
    {
        $file = File::find($id);

        if (!$file) {
            return response()->json([
                'message' => 'File not found'], 404);
        }

        return Storage::disk('public')->download($file->path);
    }

    public function destroy($id)
    {
        $file = File::find($id);

        if (!$file) {
            return response()->json([
                'message' => 'file not found'], 404);
        }

        Storage::disk('public')->delete($file->path);

        $file->delete();

        return response()->json([
            'message' => 'file deleted'
        ]);
    }
}