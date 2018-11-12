<?php

$this->resource('attributes', 'Catalogs\AttributeController')->only([
    'index'
]);

$this->get('attributes/create', 'Catalogs\AttributeController@index');
$this->get('attributes/{id?}/edit', 'Catalogs\AttributeController@index');


$this->resource('pages', 'Catalogs\PagesController')->only([
    'index'
]);

$this->get('pages/create', 'Catalogs\PagesController@index');
$this->get('pages/{id?}/edit', 'Catalogs\PagesController@index');
