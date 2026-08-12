<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'parent_id' => 'nullable|exists:tasks,id',

            'title' => 'sometimes|string|max:255',

            'priority' => 'sometimes|in:low,normal,high',

            'end_date' => 'sometimes|date|after:today',

            'description' => 'nullable|string',

            'hashtag' => 'nullable|string|max:255',
        ];
    }
}