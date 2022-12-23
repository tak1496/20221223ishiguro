<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('user/search', [UserController::class, 'search']);
Route::post('post/post_data', [PostController::class, 'postData']);
Route::post('comment/comment_list', [CommentController::class, 'commentList']);
Route::post('like/like_search', [LikeController::class, 'likeSearch']);

Route::apiResource('/user', UserController::class);
Route::apiResource('/post', PostController::class);
Route::apiResource('/comment', CommentController::class);
Route::apiResource('/like', LikeController::class);
