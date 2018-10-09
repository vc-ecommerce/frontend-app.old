const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/theme', 'public/js')
//    .sass('resources/sass/app.scss', 'public/css');


//mix.copy('resources/themes/startui/build/css/custom.css', 'public/css/custom.css');
mix.copyDirectory('resources/themes/startui/build/css', 'public/css')
    .copyDirectory('resources/themes/startui/build/img', 'public/img')
    .copyDirectory('resources/themes/startui/build/js', 'public/js')
    .copyDirectory('resources/themes/startui/build/fonts', 'public/fonts')

mix.js('resources/assets/js/pages/home/custom.js', 'public/js/home-custom.js')
   .js('resources/assets/js/pages/home/app.js', 'public/js/home.js')

mix.extract(['vue']);
