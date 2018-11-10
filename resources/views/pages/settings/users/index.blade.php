@extends('layouts.app')

@section('content')

    @component('layouts.default.breadcrumb')
        @slot('title')
            Usuários
        @endslot
        @slot('url')
            <li><a href="javascript::void(0)">Configurações</a></li>
            <li><a href="javascript::void(0)">Usuários</a></li>
            <li class="active">Listar</li>
        @endslot
    @endcomponent

    <user-index>Carregando...</user-index>

@endsection

@section('css')
<link rel="stylesheet" href="{{ asset('css/lib/bootstrap-sweetalert/sweetalert.css') }}">
<link rel="stylesheet" href="{{ asset('css/separate/vendor/sweet-alert-animations.min.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('js/lib/bootstrap-sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('js/lib/hide-show-password/bootstrap-show-password.min.js') }}"></script>
<script src="{{ asset('js/lib/hide-show-password/bootstrap-show-password-init.js') }}"></script>

<script src="{{ asset('js/users.js') }}"></script>
@endsection
