<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
        ]);
    }
}
