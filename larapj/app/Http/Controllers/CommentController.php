<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        $items = Comment::all();
        return response()->json(
            [
                'data' => $items,
            ],
            200
        );
    }

    public function store(Request $request)
    {
        $item = Comment::create($request->all());
        return response()->json(
            [
                'data' => $item,
            ],
            201
        );
    }

    public function show(Comment $Comment)
    {
        //
    }

    public function update(Request $request, Comment $Comment)
    {
        //
    }

    public function destroy(Comment $Comment)
    {
        //
    }

    public function commentList(Request $request)
    {
        $items = Comment::with('users')
            ->where('post_id', '=', $request->post_id)
            ->get();

        return response()->json(
            [
                'data' => $items,
            ],
            200
        );
    }
}
