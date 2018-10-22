<?php
$this->name('auth')->resource('login', 'Auth\LoginController')->only([
    'index'
]);

$this->name('auth')->resource('reset-password', 'Auth\ResetPasswordController')->only([
    'index'
]);

$this->name('auth')->resource('token', 'Auth\TokenController')->only([
    'store'
]);


Route::name('dashboard')->get('/', function () {
    return view('home');
})->middleware('check.token');
