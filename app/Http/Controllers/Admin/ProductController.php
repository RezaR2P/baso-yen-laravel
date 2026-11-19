<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    private const CARD_COLUMNS = ['id', 'name', 'slug', 'category_id', 'description', 'image_url'];

    public function index(Request $request)
    {
        $categories = ProductCategory::orderBy('name')->get(['id', 'name', 'slug']);

        // Filter kategori lewat ?kategori=slug; slug yang tidak dikenal diabaikan.
        $active = $categories->firstWhere('slug', $request->query('kategori'));

        $products = Product::with('category:id,name')
            ->where('is_active', true)
            ->when($active, fn($q) => $q->where('category_id', $active->id))
            ->orderByDesc('is_featured')
            ->latest()
            ->paginate(8, self::CARD_COLUMNS)
            ->withQueryString();

        return Inertia::render('public/produk/index', [
            'categories' => $categories,
            'products' => $products,
            'activeCategory' => $active?->slug,
        ]);
    }

    public function show(Product $product)
    {
        abort_unless($product->is_active, 404);

        $product->load('category:id,name,slug');

        $related = Product::with('category:id,name')
            ->where('is_active', true)
            ->where('id', '!=', $product->id)
            ->when($product->category_id, fn($q) => $q->where('category_id', $product->category_id))
            ->latest()
            ->take(4)
            ->get(self::CARD_COLUMNS);

        return Inertia::render('public/produk/show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
