<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArtikelController extends Controller
{
    // Isi artikel tidak perlu dikirim ke halaman daftar.
    private const LIST_COLUMNS = ['id', 'title', 'slug', 'category', 'summary', 'image_url', 'published_at'];

    private function published()
    {
        return Article::where('is_active', true)
            ->select(self::LIST_COLUMNS)
            ->orderByDesc('published_at');
    }

    public function index(Request $request): Response
    {
        $category = $request->query('kategori');

        // Artikel utama hanya saat tidak ada filter kategori.
        $latest = $category ? null : $this->published()->first();

        $articles = $this->published()
            ->when($category, fn($q) => $q->where('category', $category))
            ->when($latest, fn($q) => $q->where('id', '!=', $latest->id))
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('public/artikel/index', [
            'featured' => $request->integer('page', 1) === 1 ? $latest : null,
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
            'related' => $this->published()
                ->where('id', '!=', $article->id)
                ->take(3)
                ->get(),
        ]);
    }
}
