<?php

$this->resource('attributes', 'Catalogs\AttributeController')->except([
  'create', 'edit'
]);
