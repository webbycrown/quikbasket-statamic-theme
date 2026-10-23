<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class QuikbasketServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        Route::middleware('web')->group(function () {
            Route::statamic('/cart', 'cart', ['title' => 'Cart']);
            Route::statamic('/cart/empty', 'cart-empty', ['title' => 'Empty cart']);
            Route::statamic('/checkout', 'checkout', ['title' => 'Checkout']);
            Route::statamic('/order-received', 'thank-you', ['title' => 'Inquiry received']);
            Route::statamic('/wishlist', 'wishlist', ['title' => 'Wishlist']);
            Route::statamic('/compare', 'compare', ['title' => 'Compare']);
            Route::statamic('/account', 'account', ['title' => 'Account']);
            Route::statamic('/account/orders', 'orders', ['title' => 'Orders']);
            Route::statamic('/login', 'auth', ['title' => 'Sign in']);
            Route::statamic('/register', 'register', ['title' => 'Sign up']);
            Route::statamic('/forgot-password', 'forgot', ['title' => 'Forgot password']);
            Route::statamic('/reset-password', 'reset', ['title' => 'Reset password']);
        });
    }
}
