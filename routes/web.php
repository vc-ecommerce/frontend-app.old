<?php
$this->name('auth.login')->get('/login', 'Auth\LoginController@index');

$this->name('auth.reset')->get('/password/reset', 'Auth\ResetPasswordController@index');

$this->name('auth.forgot')->get('/password/forgot/{token?}', 'Auth\ForgotPasswordController@index');

$this->name('auth.token')->post('/token', 'Auth\TokenController@store');

Route::name('dashboard')->get('/', function () {
    return view('home');
})->middleware('check.token');

