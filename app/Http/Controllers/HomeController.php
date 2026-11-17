<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Recipe;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('public/home', [
            'categories' => ProductCategory::orderBy('name')
                ->take(4)
                ->get(['id', 'name', 'slug']),

            'featured' => Product::with('category:id,name')
                ->where('is_active', true)
                ->orderByDesc('is_featured')
                ->latest()
                ->take(4)
                ->get(['id', 'name', 'slug', 'category_id', 'description', 'image_url']),

            'recipes' => Recipe::where('is_active', true)
                ->latest()
                ->take(3)
                ->get(['id', 'title', 'slug', 'cook_time', 'servings', 'image_url']),

            'articles' => Article::where('is_active', true)
                ->latest('published_at')
                ->take(3)
                ->get(['id', 'title', 'slug', 'summary', 'image_url', 'published_at']),
        ]);
    }
}
