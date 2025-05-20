<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\VoitureController;
use App\Http\Controllers\LouerpublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ReservationController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cars', [App\Http\Controllers\CarController::class, 'index']); // Public cars listing
Route::get('/voitures/{id}', [VoitureController::class, 'show']); // Public car details
Route::get('/comments/{id}', [CommentsController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/comments', [CommentsController::class, 'store']);
    Route::get('/user/cars', [LouerpublicationController::class, 'userCars']);
    // User management routes
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'getUserDetails']);
    Route::delete('/user/{id}', [UserController::class, 'deleteUser']);
    Route::put('/user/{id}/role', [UserController::class, 'changeUserRole']);

    // Car management routes
    Route::get('/voitures', [VoitureController::class, 'index']);
    Route::delete('/voitures/{id}', [VoitureController::class, 'destroy']);
    Route::post('/voitures', [LouerpublicationController::class, 'store']);
    Route::put('/voitures/{id}', [LouerpublicationController::class, 'update']);

    // Loueur specific routes

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

// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/cars/{id}', [App\Http\Controllers\admin\CarController::class, 'getCarDetails']);
    Route::delete('/cars/{id}', [App\Http\Controllers\admin\CarController::class, 'deleteCar']);
});

