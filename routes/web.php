<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'home'])->name('home');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::post('/cart/store/{product}', function () {
    return;
})->name('cart.store');

Route::get('/shop', function () {
    return Inertia::render('shop');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
