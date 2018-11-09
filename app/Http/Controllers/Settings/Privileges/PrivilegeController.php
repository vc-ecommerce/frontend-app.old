<?php

namespace VoceCrianca\Http\Controllers\Settings\Privileges;

use Illuminate\Http\Request;
use VoceCrianca\Http\Controllers\Controller;

class PrivilegeController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.settings.privileges.index');
    }

}
