@extends('layouts.app')

@section('content')

    @component('layouts.default.breadcrumb')
        @slot('title')
           Atributos
        @endslot
        @slot('url')
            <li><a href="#">Catálagos</a></li>
            <li class="active">Atributos</li>
        @endslot
    @endcomponent

    <attribute-index>Carregando...</attribute-index>

@endsection

@section('css')
<link rel="stylesheet" href="{{ asset('css/lib/bootstrap-sweetalert/sweetalert.css') }}">
<link rel="stylesheet" href="{{ asset('css/separate/vendor/sweet-alert-animations.min.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('js/lib/bootstrap-sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('js/attributes.js') }}"></script>
@endsection
