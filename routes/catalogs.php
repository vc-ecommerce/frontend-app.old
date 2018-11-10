<?php

$this->resource('attributes', 'Catalogs\AttributeController')->only([
    'index'
]);

$this->get('attributes/create', 'Catalogs\AttributeController@index');
$this->get('attributes/{id?}/edit', 'Catalogs\AttributeController@index');
