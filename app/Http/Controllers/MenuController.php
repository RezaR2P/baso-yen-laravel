<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $categories = ProductCategory::query()
            ->with(['products' => fn($query) => $query
                ->where('is_active', true)
                ->orderBy('name')])
            ->orderBy('name')
            ->get();

        return Inertia::render('menu', [
            'categories' => $categories,
        ]);
    }
}
