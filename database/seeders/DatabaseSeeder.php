<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Task;
use App\Models\Comment;
use App\Models\File;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'egor',
            'email' => 'egor@mail.com',
            'password' => Hash::make('12345678')
        ]);

        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'abc',
            'priority' => 'normal',
            'end_date' => now()->addDays(5),
            'description' => 'abc description',
            'hashtag' => '#laravel'
        ]);

        Task::create([
            'user_id' => $user->id,
            'parent_id' => $task->id,
            'title' => 'asd',
            'priority' => 'high',
            'end_date' => now()->addDays(2),
            'description' => 'asd description',
            'hashtag' => '#php'
        ]);

        Comment::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'text' => 'asd'
        ]);

        File::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'path' => 'files/asd.jpg'
        ]);
    }
}