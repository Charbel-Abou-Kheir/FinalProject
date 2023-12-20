<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendEmailRequest;
use App\Mail\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail(SendEmailRequest $request){
        $formFields = $request->validated();

        Mail::to('fireintheboof1234@gmail.com')
        ->send(new ContactUs($formFields));
    }
}
