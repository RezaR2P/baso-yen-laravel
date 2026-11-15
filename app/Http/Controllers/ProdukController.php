<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    public function index(): Response
    {
        $categories = ProductCategory::query()
            ->with(['products' => fn($query) => $query
                ->where('is_active', true)
                ->orderBy('name')])
            ->orderBy('name')
            ->get();

        // Produk tanpa kategori (misalnya kategorinya sudah dihapus).
        $others = Product::where('is_active', true)
            ->whereNull('category_id')
            ->orderBy('name')
            ->get();

        return Inertia::render('public/produk/index', [
            'categories' => $categories,
            'others' => $others,
        ]);
    }

    public function show(Product $product): Response
    {
        // Produk Draft tidak boleh dibuka pengunjung.
        abort_unless($product->is_active, 404);

        $product->load('category');

        $related = Product::where('is_active', true)
            ->where('id', '!=', $product->id)
            ->when($product->category_id, fn($query) => $query
                ->where('category_id', $product->category_id))
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('public/produk/show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
