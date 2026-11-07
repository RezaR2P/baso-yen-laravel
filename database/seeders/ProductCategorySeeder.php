<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'Bakso', 'slug' => 'bakso'],
            ['id' => 2, 'name' => 'Mie', 'slug' => 'mie'],
            ['id' => 3, 'name' => 'Sosis', 'slug' => 'sosis'],
            ['id' => 13, 'name' => 'Kulit Pangsit', 'slug' => 'kulit-pangsit'],
        ];

        Model::unguarded(function () use ($categories) {
            foreach ($categories as $category) {
                ProductCategory::updateOrCreate(['id' => $category['id']], $category);
            }
        });
    }
}
