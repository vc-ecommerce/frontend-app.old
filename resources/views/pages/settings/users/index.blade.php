@extends('layouts.app')

@section('content')

@component('layouts.default.breadcrumb')
    @slot('title')
        Usuários
    @endslot
    @slot('url')
        <li><a href="#">Configurações</a></li>
        <li class="active">Usuários</li>
    @endslot
@endcomponent

<user-list>Carregando...</user-list>

@endsection

@section('scripts')
    <script src="{{ asset('js/users.js') }}"></script>
@endsection
