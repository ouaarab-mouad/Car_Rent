<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\LouerpublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // User management routes
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'getUserDetails']);
    Route::delete('/user/{id}', [UserController::class, 'deleteUser']);
    Route::put('/user/{id}/role', [UserController::class, 'changeUserRole']);

    // Car management routes
    Route::get('/user/{id}/cars', [LouerpublicationController::class, 'userCars']);
    Route::post('/cars', [LouerpublicationController::class, 'store']);
    Route::put('/cars/{id}', [LouerpublicationController::class, 'update']);
    Route::delete('/cars/{id}', [LouerpublicationController::class, 'destroy']);
});
