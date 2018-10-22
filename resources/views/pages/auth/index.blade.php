@extends('layouts.auth')

@section('title')
  Fazer login
@endsection

@section('content')
  <login-user image="/img/avatar-sign.png" urlreset="/reset-password.html"></login-user>
@endsection

@section('scripts')
  <script src="{{ asset('js/auth.js') }}"></script>
@endsection
