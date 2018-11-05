@extends('layouts.app')

@section('content')

@component('layouts.default.breadcrumb')
    @slot('title')
        Minha Conta
    @endslot
    @slot('url')
        <li class="active">Minha Conta</li>
    @endslot
@endcomponent

<section class="card">
    <div class="card-block">
        <h5 class="with-border m-t-lg">Detalhes Pessoais</h5>
        <div class="row">
            <div class="col-lg-6">
                <fieldset class="form-group">
                    <label class="form-label" for="exampleInput">Nome</label>
                    <input type="text" class="form-control maxlength-simple" id="exampleInput" placeholder="Seu Nome" >
                </fieldset>
            </div>
        </div>
        <h5 class="with-border m-t-lg">E-mail e Senha</h5>
        <div class="row">
            <div class="col-md-6 col-sm-6">
                <fieldset class="form-group">
                    <label class="form-label" for="exampleInputEmail1">E-mail</label>
                    <input type="email" class="form-control maxlength-custom-message" id="exampleInputEmail1" placeholder="Seu Email">
                </fieldset>
            </div>
            <div class="col-md-4 col-sm-6">
                <div class="form-group">
                    <label class="form-label" for="hide-show-password">Senha</label>
                    <input id="hide-show-password" type="password" class="form-control" value="Example">
                </div>
            </div>
        </div>
        <h5 class="with-border m-t-lg">Funções Administrativas</h5>
        <div class="row">

        </div>
        <div class="row">
            <div class="col-md-4 col-sm-6">
                <button type="button" class="btn btn-inline">Salvar Alterações</button>
            </div>
        </div>
    </div>
</section>
@endsection

@section('css')


@endsection

@section('scripts')

<script src="js/lib/hide-show-password/bootstrap-show-password.min.js"></script>
<script src="js/lib/hide-show-password/bootstrap-show-password-init.js"></script>

<script>
$(function() {
    autosize($('textarea[data-autosize]'));
});

<script src="{{ asset('js/accounts.js') }}"></script>
@endsection
