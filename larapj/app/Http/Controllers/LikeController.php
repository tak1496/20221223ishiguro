<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $item = Like::create($request->all());
        return response()->json(
            [
                'data' => $item,
            ],
            201
        );
    }

    public function show(Like $like)
    {
        //
    }

    public function update(Request $request, Like $like)
    {
        //
    }

    public function destroy(Like $like)
    {
        $item = Like::where('id', $like->id)->delete();
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

    public function likeSearch(Request $request)
    {
        $items = Like::where('post_id', '=', $request->post_id)
            ->where('user_id', '=', $request->user_id)
            ->get();

        return response()->json(
            [
                'data' => $items,
            ],
            200
        );
    }
}
