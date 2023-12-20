<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class NurseSignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'cv' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'password' => [
                'required',  
                Password::min(8)->letters()
            ],
            'role' => 'required'
        ];
    }
}
// 'cv' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

