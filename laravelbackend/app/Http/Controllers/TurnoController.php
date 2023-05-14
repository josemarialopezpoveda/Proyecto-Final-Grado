<?php

namespace App\Http\Controllers;

use App\Helpers\Auxiliares;
use App\Models\Dia;
use App\Models\Empresa;
use App\Models\Turno;
use App\Models\Empleado;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TurnoController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $turnos = Turno::with('dias')->where('empresa_id', $empresaId)->get();
            if (count($turnos) > 0) {
                return response()->json($turnos);
            } else {
                $data = ['message' => 'No existen turnos para la empresa.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $turnoId
     * @return JsonResponse
     */
    public function show($turnoId): JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $turno = Turno::with('dias')->find($turnoId);
            if ($turno) {
                if ($empresaId == $turno->empresa_id) {
                    $data = ['turno' => $turno];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'No autorizado.'];
                    return response()->json($data, 403);
                }
            } else {
                $data = ['message' => 'Turno no existe.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    public function turnosEmpresa($idEmpresa)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            if ($empresaId == $idEmpresa) {
                $turnos = Turno:: where('empresa_id', $idEmpresa)->get();
                if (count($turnos) > 0) {
                    $data = [
                        'message' => 'Turnos de la empresa ' . $idEmpresa,
                        'turnos' => $turnos
                    ];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'No existen turnos para la empresa.'];
                    return response()->json($data, 403);
                }
            } else {
                $data = ['message' => 'No autorizado.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            if ($empresaId == $request->empresa_id) {
                if (!is_null($request->descripcion) && ($request->descripcion !== "")) {
                    $turno = new Turno;
                    $turno->empresa_id = $request['empresa_id'];
                    $turno->descripcion = $request->descripcion;
                    $turno->save();

                    $diasPresentes = [];
                    // Obtener los días presentes en el array
                    foreach ($request->dias as $dia) {
                        $diasPresentes[] = $dia['diaSemana'];
                    }

                    $diasNoPresentes = [];
                    // Verificar los días no presentes
                    for ($i = 1; $i < 8; $i++) {
                        if (!in_array($i, $diasPresentes)) {
                            $diasNoPresentes[] = $i;
                        }
                    }
                    $horaCero = "00:00:00";
                    $diasSemana = 7;
                    $j = 0;
                    for ($i = 0; $i < $diasSemana; $i++) {
                        $dia = new Dia;
                        $dia["turno_id"] = $turno->id;
                        if (isset($request->dias[$i]["diaSemana"])) {
                            $dia = $this->getDia($request, $i, $dia);
                        } else {
                            $dia["diaSemana"] = $diasNoPresentes[$j];
                            $dia["horaInicioM"] = $horaCero;
                            $dia["horaFinM"] = $horaCero;
                            $dia["horaInicioT"] = $horaCero;
                            $dia["horaFinT"] = $horaCero;
                            $dia["horaInicioN"] = $horaCero;
                            $dia["horaFinN"] = $horaCero;
                            $j++;
                        }
                        $dia["created_at"] = Carbon::now('Europe/Madrid');
                        $dia["updated_at"] = Carbon::now('Europe/Madrid');

                        $dia->save();
                        $turno->dias[$i] = $dia;
                    }
                    $data = [
                        'message' => 'Turno creado correctamente',
                        'turno' => $turno
                    ];
                    return response()->json($data);
                } else {
                    $data = ['error' => 'La descripción del turno no puede estar vacía.',];
                    return response()->json($data, 400);
                }
            } else {
                $data = ['error' => 'No autorizado.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['error' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $turnoId
     * @return JsonResponse
     */
    public function update(Request $request, $turnoId): JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            if ($empresaId == $request->empresa_id) {
                $turno = Turno::with('dias')->find($turnoId);
                if ($turno) {
                    // Comprobar aquí que no esté asignado el turno. Si está asignado no se puede modificar.
                    $turnoAsignado = DB::table('empleados_turnos')->where('turno_id', $turnoId)->first();
                    if (is_null($turnoAsignado)) {
                        $turno->descripcion = $request->descripcion;
                        $turno->save();
                        for ($i = 0; $i < count($request->dias); $i++) {
                            $dia = Dia::find($turno->dias[$i]->id);
                            $dia = $this->getDia($request, $i, $dia);
                            $dia["updated_at"] = Carbon::now('Europe/Madrid');
                            $dia->save();
                            $turno->dias[$i] = $dia;
                        }
                        $data = [
                            'message' => 'Turno actualizado correctamente',
                            'turno' => $turno
                        ];
                        return response()->json($data);
                    } else {
                        $data = ['error' => 'El turno no se puede modificar, está asignado a un empleado'];
                        return response()->json($data, 400);
                    }
                } else {
                    $data = ['error' => 'Turno no existe'];
                    return response()->json($data, 404);
                }
            } else {
                $data = ['error' => 'No autorizado.'];
                return response()->json($data, 403);
            }
        } else {
            $data = ['error' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Turno $turno
     * @return JsonResponse
     */
    public function destroy($turnoId): JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $turno = DB::table('turnos')->where('id', $turnoId)->first();
            if (!is_null($turno)) {
                $loginOk = Auxiliares::verificarTurnoEmpresa($turno, $user);
                if ($loginOk) {
                    $turnoAsignado = DB::table('empleados_turnos')->where('turno_id', $turnoId)->first();
                    if (is_null($turnoAsignado)) {
                        DB::table('turnos')->where('id', $turnoId)->delete();
                        $data = [
                            'message' => 'Turno eliminado correctamente',
                            'turno' => $turno
                        ];
                        return response()->json($data);
                    } else {
                        $data = ['error' => 'El turno no se puede borrar, está asignado a un empleado'];
                        return response()->json($data, 400);
                    }
                } else {
                    $data = ['error' => 'No estás autorizado.'];
                    return response()->json($data, 403);
                }
            } else {
                $data = ['error' => 'Turno no existe'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['error' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }


    public function eliminarTurnoAEmpleado(Request $request): JsonResponse
    {
        // Comprobar que el usuario está autenticado y es Empresa o Empleado Administrador de la misma empresa autenticada.
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            // Busco el empleado
            $empleado = DB::table('empleados')
                ->where('id', $request->empleado_id)
                ->first();
            if (!is_null($empleado)) { // El empleado existe
                if ($empleado->empresa_id == $empresaId) { // El empleado pertenece a la empresa.
                    // Busco el turno
                    $turno = DB::table('turnos')
                        ->where('id', $request->turno_id)
                        ->first();
                    if (!is_null($turno)) {// El turno existe
                        if ($turno->empresa_id == $empresaId) { //El turno pertenece a la empresa.
                            // Obtener la fecha de inicio y finalización del turno del empleado.
                            $fechasTurnos = DB::table('empleados_turnos')
                                ->where('empleado_Id', $empleado->id)
                                ->where('turno_id', $turno->id)
                                ->where('fechaInicioTurno', $request->fechaInicioTurno)
                                ->where('fechaFinTurno', $request->fechaFinTurno)
//                            ->select('fechaInicioTurno', 'fechaFinTurno')
                                ->get();
                            if (count($fechasTurnos) > 0) { // Hay relación en la tabla empleados_turnos.
                                // Crear una matriz con todas las fechas de inicio y finalización de los turnos
                                $fechas = array();
                                foreach ($fechasTurnos as $turno) {
                                    $fechas[] = $turno->fechaInicioTurno;
                                    $fechas[] = $turno->fechaFinTurno;
                                }

                                // Obtener los registros de tiempo que se encuentran dentro del intervalo de fechas de los turnos del empleado
                                $registrosTiempos = DB::table('tiempos')
                                    ->where('empleado_Id', '=', $request->empleado_id)
                                    ->where('turno_id', '=', $request->turno_id)
                                    //->whereBetween('inicio', [$fechas[0], end($fechas)])
                                    //->orWhereBetween('fin', [$fechas[0], end($fechas)])
                                    ->get();
                                if (count($registrosTiempos) == 0) { //No hay tiempos registrados en el turno.
                                    $turnoAEliminar = DB::table('empleados_turnos')
                                        ->where('empleado_Id', $request->empleado_id)
                                        ->where('turno_id', $request->turno_id)
                                        ->where('fechaInicioTurno', $request->fechaInicioTurno)
                                        ->where('fechaFinTurno', $request->fechaFinTurno)
                                        ->first();
                                    if ($turnoAEliminar != null ) {
                                        DB::table('empleados_turnos')
                                            ->where('id', $turnoAEliminar->id)
                                            ->delete();
                                        $data = [
                                            'mensaje' => 'Turno eliminado correctamente.',
                                            'turnoEliminado' => $fechasTurnos,

                                        ];
                                        return response()->json($data);
                                    } else {
                                        $data = ['error' => 'No se pudo eliminar el turno.',];
                                        return response()->json($data, 400);
                                    }
                                } else {
                                    $data = ['error' => 'No se puede eliminar el turno, hay tiempos registrados.',];
                                    return response()->json($data, 409);
                                }
                            } else {
                                $data = ['error' => 'No hay relación entre el turno y el empleado.',];
                                return response()->json($data, 404);
                            }
                        } else {
                            $data = ['error' => 'El turno no pertenece a la empresa.',];
                            return response()->json($data, 409);
                        }
                    } else {
                        $data = ['error' => 'El turno no existe.',];
                        return response()->json($data, 404);
                    }
                } else {
                    $data = ['error' => 'El empleado no pertenece a la empresa.',];
                    return response()->json($data, 409);
                }
            } else {
                $data = ['error' => 'El empleado no existe.',];
                return response()->json($data, 404);
            }
        } else {
            $data = ['error' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }


    /*public function attach(Request $request): \Illuminate\Http\JsonResponse
    {
        $turno = Turno::find($request->turno_id);
        $turno->horarios()->attach($request->horario_id);
        $data = [
            'message'=>'Horario attached correctamente',
            'turno' => $turno
        ];
        return response()->json($data);
    }*/
    /**
     * @param Request $request
     * @param int $i
     * @param $dia
     * @return mixed
     */
    public function getDia(Request $request, int $i, $dia)
    {
        $dia["diaSemana"] = $request->dias[$i]["diaSemana"];
        $dia["horaInicioM"] = $request->dias[$i]["horaInicioM"];
        $dia["horaFinM"] = $request->dias[$i]["horaFinM"];
        $dia["horaInicioT"] = $request->dias[$i]["horaInicioT"];
        $dia["horaFinT"] = $request->dias[$i]["horaFinT"];
        $dia["horaInicioN"] = $request->dias[$i]["horaInicioN"];
        $dia["horaFinN"] = $request->dias[$i]["horaFinN"];
        return $dia;
    }
}
