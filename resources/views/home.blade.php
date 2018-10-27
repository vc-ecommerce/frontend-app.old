@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-xl-6">
        <chart-sale-week></chart-sale-week>
    </div><!--.col-->
    <div class="col-xl-6">
        <div class="row">
            <order-approved></order-approved>
            <order-canceled></order-canceled>
            <order-done></order-done>
            <order-pending></order-pending>
        </div><!--.row-->
    </div><!--.col-->
</div><!--.row-->

<div class="row">
    <div class="col-xl-12 dahsboard-column">
        <order-recent></order-recent>
    </div><!--.col-->
    {{-- <div class="col-xl-12 dahsboard-column">
        <recent-comments></recent-comments>
    </div><!--.col-->
    <div class="col-xl-12 dahsboard-column">
        <recent-contacts></recent-contacts>
    </div><!--.col--> --}}
</div>

@endsection

@section('scripts')

    <script src="{{ asset('js/home.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/lib/jqueryui/jquery-ui.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/lib/lobipanel/lobipanel.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/lib/match-height/jquery.matchHeight.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('https://www.gstatic.com/charts/loader.js') }}"></script>
    <script src="{{ asset('js/home-custom.js') }}"></script>

@endsection
