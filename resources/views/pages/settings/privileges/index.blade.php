@extends('layouts.app')

@section('content')

    @component('layouts.default.breadcrumb')
        @slot('title')
            Privilégios
        @endslot
        @slot('url')
            <li><a href="#">Configurações</a></li>
            <li class="active">Privilégios</li>
        @endslot
    @endcomponent

    <privilege-index>Carregando...</privilege-index>

@endsection

@section('css')
<link rel="stylesheet" href="{{ asset('css/lib/bootstrap-sweetalert/sweetalert.css') }}">
<link rel="stylesheet" href="{{ asset('css/separate/vendor/sweet-alert-animations.min.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('js/lib/bootstrap-sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('js/privileges.js') }}"></script>
@endsection
