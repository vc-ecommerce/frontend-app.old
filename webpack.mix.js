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

//mix.browserSync('http://localhost:8000');

//mix.copy('resources/themes/startui/build/css/custom.css', 'public/css/custom.css');
mix.copyDirectory('resources/themes/startuiadmin/build/css', 'public/css')
  .copyDirectory('resources/themes/startuiadmin/build/img', 'public/img')
  .copyDirectory('resources/themes/startuiadmin/build/js', 'public/js')
  .copyDirectory('resources/themes/startuiadmin/build/fonts', 'public/fonts');

mix.js('resources/assets/js/app.js', 'public/js/init.js').version();

mix.js('resources/assets/js/pages/auth/auth.js', 'public/js/auth.js');

mix.js('resources/assets/js/pages/home/custom.js', 'public/js/home-custom.js')
  .js('resources/assets/js/pages/home/home.js', 'public/js/home.js');

mix.js('resources/assets/js/pages/settings/users.js', 'public/js/users.js')
  .js('resources/assets/js/pages/settings/roles.js', 'public/js/roles.js')
  .js('resources/assets/js/pages/settings/privileges.js', 'public/js/privileges.js');

mix.js('resources/assets/js/pages/catalogs/attributes.js', 'public/js/attributes.js');

mix.js('resources/assets/js/pages/accounts/accounts.js', 'public/js/accounts.js');

mix.extract(['vue', 'jquery']);
