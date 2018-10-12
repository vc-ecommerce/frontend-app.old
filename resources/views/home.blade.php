@extends('layouts.app')

@section('content')
<div class="page-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-6">
                <sale-week></sale-week>
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
            <div class="col-xl-12 dahsboard-column">
                <recent-comments></recent-comments>
            </div><!--.col-->
            <div class="col-xl-12 dahsboard-column">
                <contacts></contacts>
            </div><!--.col-->
        </div>
    </div><!--.container-fluid-->
</div><!--.page-content-->
@endsection

@section('scripts')

    <script src="/js/home.js"></script>
    <script type="text/javascript" src="js/lib/jqueryui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/lib/lobipanel/lobipanel.min.js"></script>
    <script type="text/javascript" src="js/lib/match-height/jquery.matchHeight.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="/js/home-custom.js"></script>

@endsection