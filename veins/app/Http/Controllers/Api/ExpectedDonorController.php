<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpectedDonorRequest;
use App\Models\ExpectedDonor;
use Illuminate\Support\Facades\Auth;

class ExpectedDonorController extends Controller
{
    // show all expected donors
    public function index($key = null){
        // return ExpectedDonor::all();
        if($key != null){
            return ExpectedDonor::where('name','Like',"%$key%")->get();
        } else {
            return ExpectedDonor::latest()->get();
        }
    }

    // store expected donor
    public function store (StoreExpectedDonorRequest $request){
        $formFields = $request->validated();
        $formFields['profile_picture'] = Auth::user()->profile_picture;
        $formFields['user_id'] = auth()->id();

        ExpectedDonor::create($formFields);
    }

    // delete expected donor
    public function destroy (ExpectedDonor $id){
        $id->delete();
    }
}
