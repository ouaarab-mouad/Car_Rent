<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LouerpublicationController;

Route::post('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    
    return response()->json([
        'message' => 'congrats the api gave u an answer'
    ]);
});

Route::get('/user/{id}/cars', [LouerpublicationController::class, 'userCars']);

Route::post('/cars', [LouerpublicationController::class, 'store']);
Route::put('/cars/{id}', [LouerpublicationController::class, 'update']);
Route::delete('/cars/{id}', [LouerpublicationController::class, 'destroy']);
