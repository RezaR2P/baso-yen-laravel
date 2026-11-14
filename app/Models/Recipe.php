<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = ['title', 'slug', 'cook_time', 'servings', 'difficulty', 'ingredients', 'steps', 'image_url', 'is_active'];
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
