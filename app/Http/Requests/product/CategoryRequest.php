<?php

namespace App\Http\Requests\product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     * @return array
     */
    public function rules(): array
    {
        return [
            'category_name' => ['required','max:50'],
            'category_slug' => ['max:255','required'],
            'active'=>['boolean','nullable'],
            'parent_id'=>[ 'nullable', Rule::exists('categories','id')]
        ];
    }

    public function getFilteredAttributes(): array
    {
        return array_merge($this->only(
            [
                'category_name',
                'category_slug',
                'active',
                'parent_id'
            ]
        ), []);
    }



}
