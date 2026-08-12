<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;

class CommentController extends Controller
{
    public function index($taskId)
    {
        $comments = Comment::where('task_id', $taskId)->get();

        return response()->json($comments);
    }

    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = auth()->id();

        $comment = Comment::create($data);

        return response()->json($comment, 201);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'comment not found'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'comment deleted'
        ]);
    }
}
