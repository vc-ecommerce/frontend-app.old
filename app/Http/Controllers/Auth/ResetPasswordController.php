<?php

namespace VoceCrianca\Http\Controllers\Auth;

use VoceCrianca\Http\Controllers\Controller;

class ResetPasswordController extends Controller
{
    public function index()
    {
        return view('pages.auth.reset');
    }
}
