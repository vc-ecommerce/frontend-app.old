<?php

namespace VoceCrianca\Http\Controllers\Auth;

use VoceCrianca\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{

    public function index(Request $request)
    {
        $token = $request->route('token');
        return view('pages.auth.forgot', compact('token'));
    }
}
