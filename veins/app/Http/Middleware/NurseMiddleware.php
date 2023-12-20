<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class NurseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            if(Auth::user()->role == 'nurse'){
                return $next($request);
            } else {
                return response([
                'message' => 'Unauthorized'
                ], 401);
            }
        } else {
            return response([
                'message' => 'Unauthenticated'
            ], 401);
        }

        return $next($request);
    }
}
