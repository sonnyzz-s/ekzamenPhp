<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'parent_id' => 'nullable|exists:tasks,id',

            'title' => 'required|string|max:255',

            'priority' => 'required|in:low,normal,high',

            'end_date' => 'required|date|after_or_equal:today',

            'description' => 'nullable|string',

            'hashtag' => 'nullable|string|max:255'
        ];
    }
}