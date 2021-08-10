<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventCollection extends JsonResource {
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'start_datetime' => $this->start_datetime,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'users' => UserCollection::collection($this->users),
        ];
    }
}
