<?php

namespace VoceCrianca\Http\Middleware;

use Closure;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!session('token')){
            return redirect()->route('auth.login');
        }
        return $next($request);
    }
}
