@extends('layouts.auth')

@section('title')
    Redefinição de Senha
@endsection

@section('content')
    <reset-password></reset-password>
@endsection

@section('scripts')
    <script src="{{ asset('js/auth.js') }}"></script>
@endsection
