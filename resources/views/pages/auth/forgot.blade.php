@extends('layouts.auth')

@section('title')
    Redefinir senha
@endsection

@section('content')
    <forgot-password urllogin="{{ route('auth.login.index') }}"></forgot-password>
@endsection

@section('scripts')
    <script src="{{ asset('js/auth.js') }}"></script>
@endsection
