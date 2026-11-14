<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RecipeController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

// Halaman publik
Route::inertia('/', 'welcome')->name('home');
Route::get('menu', [MenuController::class, 'index'])->name('menu');
Route::get('kontak', [KontakController::class, 'create'])->name('kontak');
Route::post('kontak', [KontakController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('kontak.store');

// Halaman admin (wajib login)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

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
