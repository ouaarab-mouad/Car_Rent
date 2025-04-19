<?php

use App\Http\Controllers\admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users',[UserController::class,'index']);
Route::delete('/users/{id}',[UserController::class,'deleteUser']);
Route::put('/userRole/{id}',action: [UserController::class,'changeUserRole']);
