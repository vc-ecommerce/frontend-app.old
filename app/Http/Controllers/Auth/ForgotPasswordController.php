<?php

namespace VoceCrianca\Http\Controllers\Auth;

use VoceCrianca\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{

    public function index()
    {
        return view('pages.auth.forgot');
    }
}
