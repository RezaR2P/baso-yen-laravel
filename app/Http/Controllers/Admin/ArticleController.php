<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesImages;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    use HandlesImages;

    private const CATEGORIES = ['Tips', 'Berita', 'Edukasi'];

    public function index(): Response
    {
        return Inertia::render('admin/articles/index', [
            'articles' => Article::latest()->get(),
            'categories' => self::CATEGORIES,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['image_url'] = $request->hasFile('image')
            ? $this->saveImage($request->file('image'), 'articles')
            : null;
        $data['published_at'] = $data['is_active'] ? now() : null;

        Article::create(Arr::except($data, 'image'));

        return back();
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $data = $this->validated($request, $article);

        if ($request->hasFile('image')) {
            $this->deleteImage($article->image_url);
            $data['image_url'] = $this->saveImage($request->file('image'), 'articles');
        }

        // Tanggal terbit diisi saat pertama kali artikel diterbitkan.
        if ($data['is_active'] && ! $article->published_at) {
            $data['published_at'] = now();
        }

        $article->update(Arr::except($data, 'image'));

        return back();
    }

    public function destroy(Article $article): RedirectResponse
    {
        $this->deleteImage($article->image_url);
        $article->delete();

        return back();
    }

    private function validated(Request $request, ?Article $article = null): array
    {
        $request->merge([
            'slug' => Str::slug($request->input('slug') ?: $request->input('title')),
        ]);

        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'slug' => [
                'required',
                'string',
                'max:200',
                Rule::unique('articles', 'slug')->ignore($article?->id)
            ],
            'category' => ['nullable', Rule::in(self::CATEGORIES)],
            'summary' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);
    }
}
