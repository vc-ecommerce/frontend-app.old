<!DOCTYPE html>
<html>
<head lang="{{ app()->getLocale() }}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>@yield('title')</title>

    @include('layouts.default.icon')

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="{{ asset('css/separate/pages/login.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/lib/font-awesome/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/lib/bootstrap/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
</head>
<body>

    <div class="page-center">
        <div class="page-center-in">
            <div class="container-fluid" id="app">
                @yield('content')
            </div>
        </div>
    </div><!--.page-center-->


    @component('layouts.default.body_scripts')
        @yield('scripts')
    @endcomponent

    <script type="text/javascript" src="{{ asset('js/lib/match-height/jquery.matchHeight.min.js') }}"></script>
    <script>
          $(function() {
            $('.page-center').matchHeight({
              target: $('html')
            });

            $(window).resize(function(){
                setTimeout(function(){
                    $('.page-center').matchHeight({ remove: true });
                    $('.page-center').matchHeight({
                        target: $('html')
                    });
                },100);
            });
          });
    </script>

  <script src="{{ asset('js/app.js') }}"></script>

</body>
</html>
