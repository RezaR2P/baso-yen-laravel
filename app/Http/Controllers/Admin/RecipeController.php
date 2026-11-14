<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesImages;
use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RecipeController extends Controller
{
    use HandlesImages;

    public function index(): Response
    {
        return Inertia::render('admin/recipes/index', [
            'recipes' => Recipe::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['image_url'] = $request->hasFile('image')
            ? $this->saveImage($request->file('image'), 'recipes')
            : null;

        Recipe::create(Arr::except($data, 'image'));

        return back();
    }

    public function update(Request $request, Recipe $recipe): RedirectResponse
    {
        $data = $this->validated($request, $recipe);

        if ($request->hasFile('image')) {
            $this->deleteImage($recipe->image_url);
            $data['image_url'] = $this->saveImage($request->file('image'), 'recipes');
        }

        $recipe->update(Arr::except($data, 'image'));

        return back();
    }

    public function destroy(Recipe $recipe): RedirectResponse
    {
        $this->deleteImage($recipe->image_url);
        $recipe->delete();

        return back();
    }

    private function validated(Request $request, ?Recipe $recipe = null): array
    {
        $request->merge([
            'slug' => Str::slug($request->input('slug') ?: $request->input('title')),
        ]);

        return $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'slug' => [
                'required',
                'string',
                'max:150',
                Rule::unique('recipes', 'slug')->ignore($recipe?->id)
            ],
            'cook_time' => ['nullable', 'integer', 'min:1', 'max:1440'],
            'servings' => ['nullable', 'integer', 'min:1', 'max:100'],
            'difficulty' => ['required', Rule::in(['Mudah', 'Sedang', 'Sulit'])],
            'ingredients' => ['required', 'string'],
            'steps' => ['required', 'string'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);
    }
}
