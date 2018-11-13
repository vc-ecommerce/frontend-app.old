<!DOCTYPE html>
<html>
<head lang="{{ app()->getLocale() }}">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    @include('layouts.default.icon')

    @component('layouts.default.head_scripts')
        @yield('css')
    @endcomponent

</head>
<body class="with-side-menu control-panel control-panel-compact">

	@include('layouts.default.header')
	@include('layouts.default.sidebar-left')

    <div id="content" style="display: none;">
        <div class="page-content">
            <div class="container-fluid">
                @yield('content')
            </div>
            <!--.container-fluid-->
        </div>
	</div>

	@include('layouts.default.sidebar-right')

	@component('layouts.default.body_scripts')
		@yield('scripts')
	@endcomponent

	<!-- Scripts -->
    <script src="{{ asset('js/init.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>

</body>
</html>
