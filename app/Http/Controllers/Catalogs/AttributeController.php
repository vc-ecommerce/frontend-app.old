<?php

namespace VoceCrianca\Http\Controllers\Catalogs;

use Illuminate\Http\Request;
use VoceCrianca\Http\Controllers\Controller;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.catalogs.attributes.index');
    }

}
