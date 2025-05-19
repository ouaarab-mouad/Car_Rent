<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\LouerpublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cars', [App\Http\Controllers\CarController::class, 'index']); // Public cars listing
Route::get('/cars/{id}', [LouerpublicationController::class, 'show']); // Public car details

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

    // Car management routes
    Route::get('/voitures', [LouerpublicationController::class, 'index']);
    Route::post('/voitures', [LouerpublicationController::class, 'store']);
    Route::put('/voitures/{id}', [LouerpublicationController::class, 'update']);
    Route::get('/voitures/{id}', action: [LouerpublicationController::class, 'show']);
    Route::delete('/voitures/{id}', [LouerpublicationController::class, 'destroy']);

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
    Route::get('/reservations', [\App\Http\Controllers\ReservationController::class, 'getAllReservations']);
});

// Client routes
Route::middleware(['auth:sanctum'])->prefix('client')->group(function () {
    Route::post('/reservations/{id}/cancel', [ReservationController::class, 'cancel']);
});
// Admin Car Routes
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/cars/{id}', [App\Http\Controllers\admin\CarController::class, 'getCarDetails']);
    Route::delete('/cars/{id}', [App\Http\Controllers\admin\CarController::class, 'deleteCar']);
});

