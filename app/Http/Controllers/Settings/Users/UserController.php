<?php

namespace VoceCrianca\Http\Controllers\Settings\Users;

use Illuminate\Http\Request;
use VoceCrianca\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.settings.users.index');
    }
}
