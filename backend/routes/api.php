<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\LouerpublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cars', [App\Http\Controllers\CarController::class, 'index']); // Public cars listing

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Loueur routes - Specific routes first
    Route::get('/user/cars', [LouerpublicationController::class, 'userCars']);

    // User management routes - Dynamic routes after specific ones
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'getUserDetails']);
    Route::delete('/user/{id}', [UserController::class, 'deleteUser']);
    Route::put('/user/{id}/role', [UserController::class, 'changeUserRole']);
    Route::post('/cars', [LouerpublicationController::class, 'store']);
    Route::put('/cars/{id}', [LouerpublicationController::class, 'update']);
    Route::delete('/cars/{id}', [LouerpublicationController::class, 'destroy']);
    Route::get('/cars/{id}', [LouerpublicationController::class, 'show']);

    // Profile routes
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'me']);
    Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update']);
    Route::get('/users/{id}/profile', [\App\Http\Controllers\ProfileController::class, 'show']);
    Route::get('/loeur/profile', [\App\Http\Controllers\ProfileController::class, 'loueurProfile']);

    // Reservation routes
    Route::post('/reservations', [\App\Http\Controllers\ReservationController::class, 'store']);
    Route::get('/client/reservations', [\App\Http\Controllers\ReservationController::class, 'clientReservations']);
    Route::get('/loueur/reservations', [\App\Http\Controllers\LoueurController::class, 'reservations']);
    Route::post('/loueur/reservations/{id}/accept', [\App\Http\Controllers\LoueurController::class, 'acceptReservation']);
    Route::post('/loueur/reservations/{id}/refuse', [\App\Http\Controllers\LoueurController::class, 'refuseReservation']);
});
