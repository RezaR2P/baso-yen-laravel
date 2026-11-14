<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::with('category:id,name')->latest()->get(),
            'categories' => ProductCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['image_url'] = $request->hasFile('image')
            ? $this->saveImage($request->file('image'))
            : null;

        Product::create(Arr::except($data, 'image'));

        return back();
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $this->validated($request, $product);

        // Foto hanya diganti jika admin memilih file baru.
        if ($request->hasFile('image')) {
            $this->deleteImage($product->image_url);
            $data['image_url'] = $this->saveImage($request->file('image'));
        }

        $product->update(Arr::except($data, 'image'));

        return back();
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->deleteImage($product->image_url);
        $product->delete();

        return back();
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        $request->merge([
            'slug' => Str::slug($request->input('slug') ?: $request->input('name')),
        ]);

        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'slug' => [
                'required',
                'string',
                'max:150',
                Rule::unique('products', 'slug')->ignore($product?->id)
            ],
            'category_id' => ['nullable', 'exists:product_categories,id'],
            'description' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:2048'], // maksimal 2 MB
        ]);
    }

    private function saveImage(UploadedFile $file): string
    {
        return '/storage/' . $file->store('products', 'public');
    }

    private function deleteImage(?string $url): void
    {
        // Hanya hapus file yang diunggah lewat admin, bukan foto lama di public/.
        if ($url && str_starts_with($url, '/storage/')) {
            Storage::disk('public')->delete(Str::after($url, '/storage/'));
        }
    }
}
