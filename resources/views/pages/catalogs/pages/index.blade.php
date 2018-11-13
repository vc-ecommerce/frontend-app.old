@extends('layouts.app')

@section('content')

    @component('layouts.default.breadcrumb')
        @slot('title')
           Páginas de informações
        @endslot
        @slot('url')
            <li><a href="javascript::void(0)">Catálagos</a></li>
            <li><a href="{{ route('catalogs.pages.index') }}">Páginas</a></li>
            <breadcrumbs></breadcrumbs>
        @endslot
    @endcomponent

    <page-index>Carregando...</page-index>

@endsection

@section('css')

<link rel="stylesheet" href="{{ asset('css/lib/ladda-button/ladda-themeless.min.css') }}">
<link rel="stylesheet" href="{{ asset('css/separate/vendor/context_menu.min.css') }}">
<link rel="stylesheet" href="{{ asset('css/lib/bootstrap-sweetalert/sweetalert.css') }}">
<link rel="stylesheet" href="{{ asset('css/separate/vendor/sweet-alert-animations.min.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('js/lib/ladda-button/spin.min.js') }}"></script>

<script src="{{ asset('js/lib/ladda-button/ladda.min.js') }}"></script>
<script src="{{ asset('js/lib/ladda-button/ladda-button-init.js') }}"></script>
<script src="{{ asset('js/lib/bootstrap-sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('js/pages.js') }}"></script>
@endsection
