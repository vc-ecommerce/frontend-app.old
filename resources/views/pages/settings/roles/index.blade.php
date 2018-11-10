@extends('layouts.app')

@section('content')

    @component('layouts.default.breadcrumb')
        @slot('title')
            Funções
        @endslot
        @slot('url')
            <li><a href="javascript::void(0)">Configurações</a></li>
            <li><a href="javascript::void(0)">Funções</a></li>
            <li class="active">Listar</li>
        @endslot
    @endcomponent

    <role-index>Carregando...</role-index>

@endsection

@section('css')
<link rel="stylesheet" href="{{ asset('css/lib/bootstrap-sweetalert/sweetalert.css') }}">
<link rel="stylesheet" href="{{ asset('css/separate/vendor/sweet-alert-animations.min.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('js/lib/bootstrap-sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('js/roles.js') }}"></script>
@endsection
