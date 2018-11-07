<?php

$this->resource('users', 'Settings\Users\UserController')->only([
    'index'
]);

$this->resource('roles', 'Settings\Roles\RoleController')->only([
    'index'
]);

$this->resource('permissions', 'Settings\Permissions\PermissionController')->only([
    'index'
]);
