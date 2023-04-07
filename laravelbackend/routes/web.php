<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return view('welcome');
    //return view('/mi-pagina', 'mi_pagina_react')->name('mi_pagina_react');
    return view('mi_pagina_react');
    //echo "TimeMana";
});
//Route::view('/mi-pagina', 'mi_pagina_react')->name('mi_pagina_react');
