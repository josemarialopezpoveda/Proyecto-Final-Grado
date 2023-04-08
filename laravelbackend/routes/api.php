<?php

use App\Http\Controllers\CasoController;
use App\Http\Controllers\MensajeController;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TurnoController;
use App\Http\Controllers\TiempoController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\AusenciaController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\TipoausenciaController;
use App\Models\Empleado;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get(
    /**
     * @param Request $request
     * @return mixed
     */
    '/empresa',
    function (Request $request) {
        return $request->empresa();
    }
);

//Empresa

//Route::post('/empresas', 'App\Http\Controllers\EmpresaController@store');
//Route::post('/login', 'App\Http\Controllers\EmpresaController@login');

Route::get('/empresas', [EmpresaController::class, 'index']);
Route::post('/login', [EmpresaController::class, 'login']);
Route::post('/empresas', [EmpresaController::class, 'store']);
Route::get('/error', [EmpresaController::class, 'paginaError']);


//Empleado

Route::post('/loginEmpleado', 'App\Http\Controllers\EmpleadoController@login');
Route::get('/empleadoOnline/{empleado}', [TiempoController::class, 'empleadoOnline']);

// Turnos

Route::get('/turnos', [TurnoController::class, 'index']);
Route::get('/turnos/{turno}', [TurnoController::class, 'show']);
Route::get('/turnosEmpresa/{empresaId}', [TurnoController::class, 'turnosEmpresa']);
Route::post('/turnos', [TurnoController::class, 'store']);
Route::delete('/turnos/{turno}', [TurnoController::class, 'destroy']);
Route::put('/turnos/{turno}', [TurnoController::class, 'update']);

// Tipos de Ausencia

Route::get('/tipoAusencias', [TipoausenciaController::class, 'index']);
Route::get('/tipoAusencias/{tipoAusencias}', [TipoausenciaController::class, 'show']);
Route::post('/tipoAusencias', [TipoausenciaController::class, 'store']);
Route::put('/tipoAusencias/{tipoAusencias}', [TipoausenciaController::class, 'update']);
Route::delete('/tipoAusencias/{tipoAusencias}', [TipoausenciaController::class, 'destroy']);

// Ausencias
Route::get('/ausencias', [AusenciaController::class, 'index']);
Route::get('/ausencias/{ausencias}', [AusenciaController::class, 'show']);
Route::post('/ausencias', [AusenciaController::class, 'store']);
Route::put('/ausencias/{ausencias}', [AusenciaController::class, 'update']);
Route::delete('/ausencias/{ausencias}', [AusenciaController::class, 'destroy']);

Route::get('/ausenciasEmpleados', [AusenciaController::class, 'ausenciasEmpleados']);
Route::get('/ausenciasEmpleados/{empleadoId}', [AusenciaController::class, 'ausenciasEmpleado']);

// Tiempos
Route::get('/tiempos', [TiempoController::class, 'index']);
Route::get('/tiempos/{tiempos}', [TiempoController::class, 'show']);
Route::post('/tiempos', [TiempoController::class, 'store']);
Route::put('/tiempos/{tiempos}', [TiempoController::class, 'update']);
Route::delete('/tiempos/{tiempos}', [TiempoController::class, 'destroy']);

// Empleado_Turno

Route::post('/empleados/turno', [EmpleadoController::class, 'attach']);
Route::get('/turnosEmpleado/{empleadoId}', [EmpleadoController::class, 'turnoActivoEmpleado']);
//Route::get('/turnosEmpleado', [EmpleadoController::class, 'turnosEmpleados']);

// Caso



//Mensajes



Route::put('/mensajes/{mensajes}', [MensajeController::class, 'update']);
Route::delete('/mensajes/{mensajes}', [MensajeController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(
    /**
     * @return void
     */
    function () {

        //Empresas
        Route::get('/empresa', 'App\Http\Controllers\EmpresaController@show');
        Route::put('/empresa', 'App\Http\Controllers\EmpresaController@update');
        Route::delete('/empresa', 'App\Http\Controllers\EmpresaController@destroy');
        Route::get('/logout', [EmpresaController::class, 'logout']);

        //Empleados
        Route::get('/empleados', 'App\Http\Controllers\EmpleadoController@index');
        Route::post('/empleados', 'App\Http\Controllers\EmpleadoController@store');
        Route::get('/empleado', 'App\Http\Controllers\EmpleadoController@show');
        Route::put('/empleados/{empleados}', 'App\Http\Controllers\EmpleadoController@update');
        Route::delete('/empleados/{empleados}', 'App\Http\Controllers\EmpleadoController@destroy');
        Route::get('/logoutEmpleado', [EmpleadoController::class, 'logout']);


        //Casos
        Route::get('/casos/{casoId}', [CasoController::class, 'show']);
        Route::get('/casos', [CasoController::class, 'index']);
        Route::post('/casos', [CasoController::class, 'store']);


        //Mensajes
        Route::get('/mensajes', [MensajeController::class, 'index']); // Todos los mensajes de una empresa
        Route::get('/mensajes/{casoId}', [MensajeController::class, 'show']); // Todos los mensajes de un caso (casoId)
        Route::post('/mensajes', [MensajeController::class, 'store']);

    }
);
