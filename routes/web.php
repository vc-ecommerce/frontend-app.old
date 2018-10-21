<?php

$this->name('auth')->resource('login', 'Auth\LoginController')->only([
  'index'
]);




Route::get('/', function () {
    return view('home');
})->name('dashboard');

