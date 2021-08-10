<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'start_datetime',
    ];

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany{
        return $this->belongsToMany(User::class, 'users_events');
    }
}
