<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\VoitureController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Voiture routes
Route::prefix('api')->group(function () {
    Route::get('/voitures', [VoitureController::class, 'index']);
    Route::get('/voiture/{id}', [VoitureController::class, 'show']);
    Route::delete('/voiture/{id}', [VoitureController::class, 'destroy']);
});

