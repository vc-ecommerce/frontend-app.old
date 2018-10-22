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


	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
	<link rel="stylesheet" href="{{ asset('css/lib/lobipanel/lobipanel.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/separate/vendor/lobipanel.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/lib/jqueryui/jquery-ui.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/separate/pages/widgets.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/lib/font-awesome/font-awesome.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/lib/bootstrap/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/main.css') }}">
</head>
<body class="with-side-menu control-panel control-panel-compact">

	@include('layouts.default.header')
	@include('layouts.default.sidebar-left')

	<div id="content" style="display: none;">
		@yield('content')
	</div>

	@include('layouts.default.sidebar-right')

	@component('layouts.default.body_scripts')
		@yield('scripts')
	@endcomponent

	<!-- Scripts -->
  <script src="{{ asset('js/vue-app.js') }}"></script>
  <script src="{{ asset('js/app.js') }}"></script>

</body>
</html>
