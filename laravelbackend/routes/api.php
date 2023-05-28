<?php

use App\Http\Controllers\AusenciaController;
use App\Http\Controllers\CasoController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\MensajeController;
use App\Http\Controllers\TiempoController;
use App\Http\Controllers\TipoausenciaController;
use App\Http\Controllers\TurnoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


//Route::get('/turnosEmpleado', [EmpleadoController::class, 'turnosEmpleados']);


Route::middleware('auth:sanctum')->group(
/**
 * @return void
 */
    function () {
        //Empresas
        Route::get('/empresa/{empresaId}', [EmpresaController::class, 'show']);
        Route::get('/empresaEmpleados/{empresaId}', [EmpresaController::class, 'empresaEmpleados']);
        Route::put('/empresa/{empresaId}', [EmpresaController::class, 'update']);
        Route::delete('/empresa', [EmpresaController::class, 'destroy']);
        Route::get('/logout', [EmpresaController::class, 'logout']);

        //Empleados
        Route::get('/empleados', [EmpleadoController::class, 'index']);
        Route::get('/empleado/{empleadoId}', [EmpleadoController::class, 'show']);
        Route::get('/turnosEmpleado/{empleadoId}', [EmpleadoController::class, 'turnoActivoEmpleado']);
        Route::get('/todosLosTurnos/{empleadoId}', [EmpleadoController::class, 'todosLosTurnos']);
        Route::post('/empleados', [EmpleadoController::class, 'store']);
        Route::put('/empleados/{empleados}', [EmpleadoController::class, 'update']);
        Route::delete('/empleados/{empleadoId}', [EmpleadoController::class, 'destroy']);
        Route::get('/logoutEmpleado', [EmpleadoController::class, 'logout']);

        //Tiempos
        Route::get('/tiempos', [TiempoController::class, 'index']);
        Route::get('/tiempos/{empleadoId}', [TiempoController::class, 'show']);
        Route::get('/tiempo/{tiempoId}', [TiempoController::class, 'mostrarTiempo']);
        Route::get('/registroHorario/{empleadoId}', [TiempoController::class, 'registroHorario']);
        Route::get('/empleadosOnline', [TiempoController::class, 'empleadosOnline']);
        Route::get('/empleadoOnline/{empleadoId}', [TiempoController::class, 'empleadoOnline']);
        Route::get('tiempoActivo/{empleadoId}', [TiempoController::class, 'tiempoActivo']);
        Route::get('/crearCalendario/{empleadoId}', [TiempoController::class, 'crearCalendario']);

        Route::post('/tiempos', [TiempoController::class, 'store']);
        Route::put('/tiempos/{tiempoId}', [TiempoController::class, 'update']);
        Route::delete('/tiempos/{tiempos}', [TiempoController::class, 'destroy']);

        //Casos
        Route::get('/casos/{casoId}', [CasoController::class, 'show']);
        Route::get('/casos', [CasoController::class, 'index']);
        Route::get('/casosDeUnEmpleado/{empleadoId}', [CasoController::class, 'casosDeUnEmpleado']);
        Route::post('/casos', [CasoController::class, 'store']);
        Route::put('/casos/{casoId}', [CasoController::class, 'update']);
        Route::delete('/casos/{casoId}', [CasoController::class, 'destroy']);


        //Mensajes
        Route::get('/mensajes', [MensajeController::class, 'index']); // Todos los mensajes de una empresa
        Route::get('/mensajes/{casoId}', [MensajeController::class, 'show']); // Todos los mensajes de un caso (casoId)
        Route::get('/mensaje/{mensajeId}', [MensajeController::class, 'showMensaje']); // Un mensaje (mensajeId)
        Route::post('/mensajes', [MensajeController::class, 'store']);
        Route::put('/mensajes/{mensajeId}', [MensajeController::class, 'update']);
        Route::delete('/mensajes/{mensajeId}', [MensajeController::class, 'destroy']);

        //Turnos
        Route::get('/turnos', [TurnoController::class, 'index']);
        Route::get('/turnos/{turnoId}', [TurnoController::class, 'show']);
        Route::get('/turnosEmpresa/{empresaId}', [TurnoController::class, 'turnosEmpresa']);
        Route::get('/turnoActivo/{empleadoId}', [EmpleadoController::class, 'turnoActivoEmpleado']);
        Route::get('/incidenciasTurnos', [TurnoController::class, 'incidenciasTurnos']);
        Route::post('/turnos', [TurnoController::class, 'store']);
        Route::put('/turnos/{turno}', [TurnoController::class, 'update']);
        Route::delete('eliminarTurnoAEmpleado/{turnoEmpleadoId}', [TurnoController::class, 'eliminarTurnoAEmpleado']);
        Route::delete('/turnos/{turnoId}', [TurnoController::class, 'destroy']);

        // Empleado_Turno
        Route::get('/turnoEmpleado/{turnoEmpleadoId}', [EmpleadoController::class, 'turnoEmpleado']);
        Route::post('/asignarTurnoAEmpleado', [EmpleadoController::class, 'asignarTurnoAEmpleado']);
        Route::put('/modificarTurnoAEmpleado/{empleadoId}', [EmpleadoController::class, 'modificarTurnoAEmpleado']);

        //Ausencias
        Route::get('/ausencias', [AusenciaController::class, 'index']);
        Route::get('/ausencia/{ausenciaId}', [AusenciaController::class, 'show']);
        Route::get('/ausenciasEmpleados', [AusenciaController::class, 'ausenciasEmpleados']);
        Route::get('/ausenciasEmpleado/{empleadoId}', [AusenciaController::class, 'ausenciasEmpleado']);
        Route::post('/ausencias', [AusenciaController::class, 'store']);
        Route::put('/ausencias/{ausenciaId}', [AusenciaController::class, 'update']);
        Route::delete('/ausencias/{ausenciaId}', [AusenciaController::class, 'destroy']);

        //Tipos de ausencias
        Route::get('/tipoAusencias', [TipoausenciaController::class, 'index']);
        Route::get('/tipoAusencias/{tipoAusenciasId}', [TipoausenciaController::class, 'show']);
        Route::post('/tipoAusencias', [TipoausenciaController::class, 'store']);
        Route::put('/tipoAusencias/{tipoAusenciasId}', [TipoausenciaController::class, 'update']);
        Route::delete('/tipoAusencias/{tipoAusenciasId}', [TipoausenciaController::class, 'destroy']);
    }
);
