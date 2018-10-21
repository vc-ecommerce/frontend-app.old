@extends('layouts.auth')

@section('title')
    Fazer login
@endsection

@section('content')
  <login-user></login-user>
@endsection

@section('scripts')
  <script src="{{ asset('js/auth.js') }}"></script>
@endsection
