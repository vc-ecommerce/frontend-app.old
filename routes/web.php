<?php
$this->name('auth')->resource('login', 'Auth\LoginController')->only([
    'index'
]);

$this->name('auth')->resource('password/reset', 'Auth\ResetPasswordController')->only([
    'index'
]);

$this->name('auth')->resource('password/forgot', 'Auth\ForgotPasswordController')->only([
    'index'
]);

$this->name('auth')->resource('token', 'Auth\TokenController')->only([
    'store'
]);


Route::name('dashboard')->get('/', function () {
    return view('home');
})->middleware('check.token');
