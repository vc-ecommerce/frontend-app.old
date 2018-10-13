<!DOCTYPE html>
<html>
<html lang="{{ app()->getLocale() }}">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

	<link href="img/favicon.png" rel="icon" type="image/png">
	<link href="img/favicon.ico" rel="shortcut icon">

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
	<link rel="stylesheet" href="css/lib/lobipanel/lobipanel.min.css">
	<link rel="stylesheet" href="css/separate/vendor/lobipanel.min.css">
	<link rel="stylesheet" href="css/lib/jqueryui/jquery-ui.min.css">
	<link rel="stylesheet" href="css/separate/pages/widgets.min.css">
    <link rel="stylesheet" href="css/lib/font-awesome/font-awesome.min.css">
    <link rel="stylesheet" href="css/lib/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body class="with-side-menu control-panel control-panel-compact">

	@include('layouts.default.header')
	@include('layouts.default.sidebar')

	<div id="content" style="display: none;">
		@yield('content')
	</div>

	@include('layouts.default.tasks')

	@component('layouts.default.body_scripts')
		@yield('scripts')
	@endcomponent

	<!-- Scripts -->
  <script src="{{ asset('js/app.js') }}"></script>
  <script src="{{ asset('js/commons.js') }}"></script>

</body>
</html>
