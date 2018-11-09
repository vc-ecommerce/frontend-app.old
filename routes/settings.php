<?php

$this->resource('users', 'Settings\Users\UserController')->only([
    'index'
]);

$this->resource('roles', 'Settings\Roles\RoleController')->only([
    'index'
]);

$this->resource('privileges', 'Settings\Privileges\PrivilegeController')->only([
    'index'
]);
