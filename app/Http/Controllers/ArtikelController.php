<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArtikelController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->query('kategori');

        $articles = Article::where('is_active', true)
            ->when($category, fn($query) => $query->where('category', $category))
            // Isi artikel tidak perlu dikirim ke halaman daftar.
            ->select(['id', 'title', 'slug', 'category', 'summary', 'image_url', 'published_at'])
            ->orderByDesc('published_at')
            ->simplePaginate(9)
            ->withQueryString();

        return Inertia::render('public/artikel/index', [
            'articles' => $articles,
            'categories' => Article::where('is_active', true)
                ->whereNotNull('category')
                ->distinct()
                ->orderBy('category')
                ->pluck('category'),
            'activeCategory' => $category,
        ]);
    }

    public function show(Article $article): Response
    {
        abort_unless($article->is_active, 404);

        return Inertia::render('public/artikel/show', [
            'article' => $article,
            'related' => Article::where('is_active', true)
                ->where('id', '!=', $article->id)
                ->select(['id', 'title', 'slug', 'category', 'summary', 'image_url', 'published_at'])
                ->orderByDesc('published_at')
                ->take(3)
                ->get(),
        ]);
    }
}
