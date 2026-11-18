<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Contact;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Recipe;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function __invoke()
  {
    return Inertia::render('dashboard', [
      'stats' => [
        'products' => Product::count(),
        'categories' => ProductCategory::count(),
        'recipes' => Recipe::count(),
        'articles' => Article::count(),
        'newMessages' => Contact::whereNull('replied_at')->count(),
      ],
      'messages' => Contact::latest()
        ->take(5)
        ->get(['id', 'name', 'email', 'subject', 'replied_at', 'created_at']),
    ]);
  }
}
