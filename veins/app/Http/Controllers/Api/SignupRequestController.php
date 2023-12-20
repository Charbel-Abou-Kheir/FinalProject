<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\SignupRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\NurseSignupRequest;

class SignupRequestController extends Controller
{
    // show all signup requests
    public function index(){
        return SignupRequest::all();
    }

    // show single signup request
    public function show(SignupRequest $id){
        return $id;
    }

    // store signup request data
    public function store(NurseSignupRequest $request){
        $formFields = $request->validated();
        $storage = Storage::disk('public');

        if($request->hasFile('cv')){
            $file = $request->file('cv');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;

            $storage->put($filename, file_get_contents($file));
            // $request->file('profile_picture')->storeAs('profilePictures/', $filename, 'public');
            $formFields['cv']= $filename;
        }

        SignupRequest::create([
            'name' => $formFields['name'],
            'email' => $formFields['email'],
            'cv' => $formFields['cv'],
            'password' => bcrypt($formFields['password']),
            'role' => $formFields['role']
        ]);
    }

    // delete signup request
    public function destroy(SignupRequest $id){
        $id->delete();
    }
}
