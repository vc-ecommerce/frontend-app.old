@extends('layouts.auth')

@section('title')
    Redifinição de senha
@endsection

@section('content')
    <reset-password urllogin="{{ route('auth.login.index') }}"></reset-password>
@endsection

@section('scripts')
    <script src="{{ asset('js/auth.js') }}"></script>
@endsection
