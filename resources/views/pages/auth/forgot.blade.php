@extends('layouts.auth')

@section('title')
    Redefinir Senha
@endsection

@section('content')
    <forgot-password
    token="{{ $token }}"
    urllogin="{{ route('auth.login') }}"
    urlreset="{{ route('auth.reset') }}" />
@endsection

@section('scripts')
    <script src="{{ asset('js/auth.js') }}"></script>
@endsection
