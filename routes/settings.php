<?php

$this->resource('users', 'Settings\Users\UserController')->except([
  'create', 'edit'
]);
