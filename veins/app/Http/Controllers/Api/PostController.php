<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    //show all posts
    public function index(){
        $posts = Post::latest()->get();

        return response(compact('posts'));
    }
    
    //show single post
    public function show(Post $id){
        $post = $id;
        
        return response(compact('post'));
    }

    // manage posts
    public function manage(){
        return auth()->user()->posts()->get();
    }

    // store post data
    public function store(PostRequest $request){
        $formFields = $request->validated();
        $formFields['profile_picture'] = Auth::user()->profile_picture;
        $formFields['user_id'] = auth()->id();
        
        Post::create($formFields);
    }

    // update post data
    public function update(PostRequest $request, Post $id){
        if($id->user_id != auth()->id()){
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }
        $formFields = $request->validated();

        $id->update($formFields);
    }

    // delete post
    public function destroy(Post $id){
        $id->delete();
    }
}
