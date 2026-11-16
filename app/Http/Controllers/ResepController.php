<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Inertia\Inertia;
use Inertia\Response;

class ResepController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/resep/index', [
            // 9 resep per halaman, dengan tombol Sebelumnya / Berikutnya.
            'recipes' => Recipe::where('is_active', true)
                ->latest()
                ->simplePaginate(9),
        ]);
    }

    public function show(Recipe $recipe): Response
    {
        abort_unless($recipe->is_active, 404);

        return Inertia::render('public/resep/show', [
            'recipe' => $recipe,
            'related' => Recipe::where('is_active', true)
                ->where('id', '!=', $recipe->id)
                ->latest()
                ->take(3)
                ->get(),
        ]);
    }
}
