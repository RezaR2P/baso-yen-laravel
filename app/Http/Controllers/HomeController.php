<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Product;
use App\Models\Recipe;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/home', [
            // Produk unggulan tampil dulu, sisanya diisi produk terbaru.
            'featured' => Product::where('is_active', true)
                ->orderByDesc('is_featured')
                ->latest()
                ->take(4)
                ->get(),

            'recipes' => Recipe::where('is_active', true)
                ->latest()
                ->take(3)
                ->get(),

            'articles' => Article::where('is_active', true)
                ->select(['id', 'title', 'slug', 'category', 'summary', 'image_url', 'published_at'])
                ->orderByDesc('published_at')
                ->take(3)
                ->get(),
        ]);
    }
}
