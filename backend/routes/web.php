<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\VoitureController;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// API routes
Route::prefix('api')->group(function () {
    // User routes
    Route::get('/users', [UserController::class, 'index']);

    // Voiture routes
    Route::get('/voitures', [VoitureController::class, 'index']);
    Route::get('/voiture/{id}', [VoitureController::class, 'show']);
    Route::delete('/voiture/{id}', [VoitureController::class, 'destroy']);

    // Reservation routes

});

