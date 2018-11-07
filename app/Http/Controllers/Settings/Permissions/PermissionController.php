<?php

namespace VoceCrianca\Http\Controllers\Settings\Permissions;

use Illuminate\Http\Request;
use VoceCrianca\Http\Controllers\Controller;

class PermissionController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.settings.permissions.index');
    }

}
