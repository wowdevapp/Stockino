<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\GeneralSettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logOut'])->name('logout');
    Route::post('/save-settings', [GeneralSettingsController::class, 'store']);
    Route::get('/settings', [GeneralSettingsController::class, 'show']);
    Route::group(['prefix' => 'product'], function () {
        Route::apiResource('/category', CategoryController::class);
        Route::apiResource('/product',productsController::class);
    });
});
