<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditProfileRequest;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // get users in descending order based on their level
    public function index(){
        return User::orderBy('times_donated', 'DESC')->get();
    }

    // get single user
    public function show(User $id){
        return $id;
    }

    // search users
    public function search($key = null){
        if($key != null){
            return User::where('name','Like',"%$key%")->get();
        } else {
            return User::latest()->get();
        }
    }

    // level up user
    public function update(Request $request, User $id){
        $payload = $request->all();

        $id->update($payload); 
    }

    // edit profile
    public function editProfile(EditProfileRequest $request, User $id){
        $payload = $request->all();
        if($request->hasFile('profile_picture') || $request->hasFile('background_picture')){
            $payload = $request->validated();
        }
        $storage = Storage::disk('public');

        if($request->hasFile('profile_picture')){
            $file = $request->file('profile_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;

            if($id->profile_picture){
                if($storage->exists($id->profile_picture)){
                $storage->delete($id->profile_picture);
                }
            }

            $storage->put($filename, file_get_contents($file));
            // $request->file('profile_picture')->storeAs('profilePictures/', $filename, 'public');
            $payload['profile_picture']= $filename;
        }

        if($request->hasFile('background_picture')){
            $file = $request->file('background_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;

            if($id->background_picture){
                if($storage->exists($id->background_picture)){
                $storage->delete($id->background_picture);
                }
            }
            

            $storage->put($filename, file_get_contents($file));
            // $request->file('profile_picture')->storeAs('profilePictures/', $filename, 'public');
            $payload['background_picture']= $filename;
        }
        $id->update($payload);
    }

    // delete user
    public function destroy(User $id){
        $id->delete();
    }
}
