<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RecipeController;
use App\Http\Controllers\KontakController;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\ProdukController;
use App\Http\Controllers\ResepController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\Admin\DashboardController;



// Halaman publik
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('resep', [ResepController::class, 'index'])->name('resep.index');
Route::get('resep/{recipe:slug}', [ResepController::class, 'show'])->name('resep.show');
Route::get('artikel', [ArtikelController::class, 'index'])->name('artikel.index');
Route::get('artikel/{article:slug}', [ArtikelController::class, 'show'])->name('artikel.show');
Route::get('kontak', [KontakController::class, 'create'])->name('kontak');
Route::inertia('layanan', 'public/layanan')->name('layanan');
Route::inertia('tentang-kami', 'public/tentang')->name('tentang');
Route::redirect('menu', '/produk', 301);
Route::get('produk', [ProdukController::class, 'index'])->name('produk.index');
Route::get('produk/{product:slug}', [ProdukController::class, 'show'])->name('produk.show');
Route::post('kontak', [KontakController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('kontak.store');

// Halaman admin (wajib login)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', CategoryController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('products', ProductController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('recipes', RecipeController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('articles', ArticleController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::post('contacts/{contact}/reply', [ContactController::class, 'reply'])->name('contacts.reply');
        Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    });
});

require __DIR__ . '/settings.php';
