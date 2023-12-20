<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SignupRequestController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ExpectedDonorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// admin middleware
Route::middleware(['auth:sanctum','isAdmin'])->group(function(){
    // signup requests
    // get all signup requests
    Route::get('/signuprequests', [SignupRequestController::class, 'index']);
    // get single signup request
    Route::get('/signuprequests/{id}', [SignupRequestController::class, 'show']);
    // delete signup request
    Route::delete('/signuprequests/{id}', [SignupRequestController::class, 'destroy']);

    // users
    // delete user
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

// nurse middleware
Route::middleware(['auth:sanctum','isNurse'])->group(function(){
    // expected donors
    // get all expected donors
    Route::get('/expecteddonors/{key?}', [ExpectedDonorController::class, 'index']);
    // delete expected donor
    Route::delete('/expecteddonors/{id}', [ExpectedDonorController::class, 'destroy']);
});

// common routes middleware
Route::middleware(['auth:sanctum','commonRoutes'])->group(function() {
    // get all users
    Route::get('/search/{key?}', [UserController::class, 'search']);
    // level up user
    Route::put('/levelup/{id}', [UserController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // posts
    // create post
    Route::post('/posts', [PostController::class, 'store']);
    // manage posts
    Route::get('/manageposts', [PostController::class, 'manage']);
    // edit post
    Route::put('/posts/{id}', [PostController::class, 'update']);
    // delete post
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // store expected donor
    Route::post('/expecteddonors', [ExpectedDonorController::class, 'store']);

    // edit profile
    Route::put('/profile/{id}', [UserController::class, 'editProfile']);
});

// signup / login
Route::post('/signupuser', [AuthController::class, 'signupUser']);
Route::post('/signupnurse', [AuthController::class, 'signupNurse']);
Route::post('/login', [AuthController::class, 'login']);

// users
// get single user
Route::get('/userprofile/{id}',[UserController::class, 'show']);
// leaderboard
Route::get('/leaderboard', [UserController::class, 'index']);

// posts
// get all posts
Route::get('/posts', [PostController::class, 'index']);
// get single post
Route::get('/posts/{id}', [PostController::class, 'show']);

// create signup request
Route::post('/signuprequests', [SignupRequestController::class, 'store']);

// send email
Route::post('/sendemail', [EmailController::class, 'sendEmail']);


