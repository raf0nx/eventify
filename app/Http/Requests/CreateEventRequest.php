<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEventRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'name' => 'required|string|unique:events|min:2|max:255',
            'description' => 'required|string|min:10|max:65535',
            'start_datetime' => 'required|date|after_or_equal:now +3 hours',
            'image' => 'file|size:512',
        ];
    }
}
