<?php

namespace VoceCrianca\Http\Controllers\Settings\Roles;

use Illuminate\Http\Request;
use VoceCrianca\Http\Controllers\Controller;

class RoleController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.settings.roles.index');
    }

}
