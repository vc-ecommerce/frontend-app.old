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
    <account-index></account-index>
@endsection

@section('css')


@endsection

@section('scripts')

<script src="{{ asset('js/lib/hide-show-password/bootstrap-show-password.min.js') }}"></script>
<script src="{{ asset('js/lib/hide-show-password/bootstrap-show-password-init.js') }}"></script>

<script src="{{ asset('js/accounts.js') }}"></script>
@endsection
