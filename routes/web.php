<?php

Route::name('auth.')->group(function () {

    $this->name('logout')->get('/logout', function () {
        session()->forget('token');
        session()->forget('data');
        session()->flush();
        return redirect()->route('auth.login');
    });

    $this->namespace('Auth')->group(function () {
        $this->name('login')->get('/login', 'LoginController@index');
        $this->name('reset')->get('/password/reset', 'ResetPasswordController@index');
        $this->name('forgot')->get('/password/forgot/{token?}', 'ForgotPasswordController@index');
        $this->name('token')->post('/token', 'TokenController@store');
    });
});

$this->name('dashboard')->get('/', function () {
    return view('home');
})->middleware('check.token');

$this->resource('accounts', 'Accounts\UserController')->only([
    'index', 'update'
])->middleware('check.token');
