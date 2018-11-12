<?php

namespace VoceCrianca\Http\Controllers\Catalogs;

use Illuminate\Http\Request;
use VoceCrianca\Http\Controllers\Controller;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.catalogs.pages.index');
    }

}
