<?php

namespace VoceCrianca\Http\Controllers\Auth;

use VoceCrianca\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TokenController extends Controller
{

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {

    if ($request->token === csrf_token()) {

      $request->session()->put('token', $request->token);
      $request->session()->put('data', $request->data);
      return $request->all();
    }

    return response()->json([], 500);

  }

}
