<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RecipeController;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', CategoryController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('products', ProductController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('recipes', RecipeController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });
});

Route::inertia('/', 'welcome')->name('home');

Route::get('menu', [MenuController::class, 'index'])->name('menu');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
