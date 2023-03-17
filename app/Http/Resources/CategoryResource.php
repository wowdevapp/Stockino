<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'=>$this->resource->id,
            'category_name'=>$this->resource->category_name,
            'category_slug'=>$this->resource->category_slug,
            'active'=>$this->resource->active,
            'parent' => new CategoryResource($this->whenLoaded('parent')),
        ];
    }
}
