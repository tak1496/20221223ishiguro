<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        //$items = Post::all();
        $items = Post::with('users')
            ->withCount('posts')
            ->get();
        return response()->json(
            [
                'data' => $items,
            ],
            200
        );
    }

    public function store(Request $request)
    {
        $item = Post::create($request->all());
        return response()->json(
            [
                'data' => $item,
            ],
            201
        );
    }

    public function show(Post $post)
    {
        //
    }

    public function update(Request $request, Post $post)
    {
        //
    }

    public function destroy(Post $post)
    {
        $item = Post::where('id', $post->id)->delete();
        if ($item) {
            return response()->json(
                [
                    'message' => 'Deleted successfully',
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'message' => 'Not found',
                ],
                404
            );
        }
    }

    public function postData(Request $request)
    {
        $items = Post::with('users')
            ->withCount('posts')
            ->where('id', '=', $request->post_id)
            ->first();

        return response()->json(
            [
                'data' => $items,
            ],
            200
        );
    }
}
