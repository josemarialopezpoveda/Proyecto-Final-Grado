<?php

namespace App\Http\Controllers;


use App\Helpers\Holidays;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tiempo;
use App\Models\Turno;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Helpers\DiasMeses;
use App\Helpers\Auxiliares;
use App\Helpers\Intervalo;

use function PHPUnit\Framework\isNull;

class TiempoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);

        if (is_numeric($empresaId)) {
            $tiempos = Tiempo::whereHas('empleado', function ($query) use ($empresaId) {
                $query->where('empresa_id', $empresaId);
            })->get();
            $data = [
                'empresaId' => $empresaId,
                'tiempos' => $tiempos,
            ];
        } else {
            $data = ['message' => $empresaId['message'],];
        }
        return response()->json($data);
    }

    public function registroHorario($empleadoId)
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);

        if ($loginOk) {
            $empleado = Empleado::find($empleadoId);
            $tiempos = Tiempo::select('inicio', 'fin')
                ->where('empleado_id', $empleadoId)
                ->orderBy('inicio', 'asc')
                ->get();
            $empresa = Empresa::find($empleado->empresa_id);
            //Empiezo a buscar turnos a partir del primer registro que tenga el empleado en la tabla tiempos.
            $primerRegistroTiempos = $tiempos->first();
            $fechaInicioRegistros = Carbon::parse($primerRegistroTiempos->inicio)->format('Y-m-d');
            $fechaHoy = Carbon::today()->format('Y-m-d');
            $turnos = [];

            while (Carbon::parse($fechaInicioRegistros) <= Carbon::parse($fechaHoy)) {
                $empleadoTurno = DB::table('empleados_turnos')->where('empleado_id', $empleado->id)
                    ->where('fechaInicioTurno', '<=', $fechaInicioRegistros)
                    ->where('fechaFinTurno', '>=', $fechaInicioRegistros)
                    ->first();
                $diaSemanaNumero = Carbon::parse($fechaInicioRegistros)->format('N');
                $dia = DB::table('dias')
                    ->where('turno_id', $empleadoTurno->turno_id)
                    ->where('diaSemana', $diaSemanaNumero)->first();

                if ($dia) {
                    if (!Carbon::parse($fechaInicioRegistros)->isWeekend() && !Holidays::isHoliday(
                            $fechaInicioRegistros
                        )) {
                        $totalTiempoATrabajar = Intervalo::sumaHorasIntervalos($dia);

                        $turnos [] = [
                            'empleado_id' => $empleado->id,
                            'empleado' => $empleado->nombre . " " . $empleado->apellidos,
                            'tipoEmpleado' => $empleado->tipoEmpleado,
                            'empresa_id' => $empleado->empresa_id,
                            'empresa' => $empresa->nombreComercial,
                            'fecha' => Carbon::parse($fechaInicioRegistros)->format('Y-m-d'),
                            'mes' => DiasMeses::getMonthName(date('n', strtotime($fechaInicioRegistros))),
                            'dia' => DiasMeses::getDaysOfWeek($diaSemanaNumero),
                            'turnoId' => $empleadoTurno->turno_id,
                            'InicioTurno' => $empleadoTurno->fechaInicioTurno,
                            'FinTurno' => $empleadoTurno->fechaFinTurno,
                            'horasJornada' => $totalTiempoATrabajar,
                        ];
                    }
                }
                $fechaInicioRegistros = Carbon::parse($fechaInicioRegistros);
                $fechaInicioRegistros->addDay();
            }

            foreach ($turnos as $turno) {
                // Realizar una consulta para buscar los registros con la misma fecha en la tabla tiempos
                $tiempos = Tiempo::select(
                    DB::raw('SUM(TIME_TO_SEC(TIMEDIFF(COALESCE(fin, NOW()), inicio))) AS segundos')
                )
                    ->where('empleado_id', $turno['empleado_id'])
                    ->whereDate('inicio', $turno['fecha'])
                    ->get();


                if ($tiempos) {
                    $tiemposRegistrados = Tiempo::select('inicio', 'fin')
                        ->where('empleado_id', $turno['empleado_id'])
                        ->whereDate('inicio', $turno['fecha'])
                        ->get();

                    $segundos = $tiempos[0]->segundos ?? 0;
                    $turno_con_segundos = Auxiliares::obtenerTiempos($turno, $segundos);
                } else {
                    //el empleado no ha trabajo este día.
                    //$segundos = $tiempos[0]->segundos ?? 0;
                    $turno_con_segundos = Auxiliares::obtenerTiempos($turno, 0);
                }
                $turno_con_segundos['registroHorario'] = $tiemposRegistrados;
                $turnos_con_segundos[] = $turno_con_segundos;
            }

            $data = ['turnos' => $turnos_con_segundos,];
        } else {
            $data = ['message' => $loginOk['message'],];
        }
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     * Devuelve todos los tiempos del empleado.
     */

    public function show($empleadoId)
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);

        if ($loginOk === true) {
            $empleado = Empleado::find($empleadoId);
            $tiempos = Tiempo::select('id','inicio', 'fin')
                ->where('empleado_id', $empleadoId)
                ->orderBy('inicio', 'asc')
                ->get();
            $empresa = Empresa::find($empleado->empresa_id);
            foreach ($tiempos as $tiempo) {
                $empleadoTurno = DB::table('empleados_turnos')->where('empleado_id', $empleado->id)
                    ->where('fechaInicioTurno', '<=', Carbon::parse($tiempo->inicio)->format('Y:m:d'))
                    ->where('fechaFinTurno', '>=', Carbon::parse($tiempo->inicio)->format('Y:m:d'))
                    //->where('activo', true)
                    ->first();
                if ($empleadoTurno) {
                    $turno = Turno::find($empleadoTurno->turno_id);
                    $diaSemanaNumero = Carbon::parse($tiempo->inicio)->format('N');
                    $dia = DB::table('dias')
                        ->where('turno_id', $empleadoTurno->turno_id)
                        ->where('diaSemana', $diaSemanaNumero)->first();

                    if ($dia) {
                        $horaLlegadaEmpleado = Carbon::parse($tiempo->inicio)->format('H:i:s');
                        $horaSalidaEmpleado = Carbon::parse($tiempo->fin)->format('H:i:s');

                        $turnoM = Auxiliares::isTurno($dia->horaInicioM);
                        $turnoT = Auxiliares::isTurno($dia->horaInicioT);
                        $turnoN = Auxiliares::isTurno($dia->horaInicioN);
                        $turnoMOk = false;
                        $turnoTOk = false;

                        if ($turnoM) {
                            $horaInicioTrabajo = Carbon::parse($dia->horaInicioM)->format('H:i:s');
                            $horaFinTrabajo = Carbon::parse($dia->horaFinM)->format('H:i:s');
                            $intervaloTrabajo = new Intervalo($horaLlegadaEmpleado, $horaSalidaEmpleado);
                            $intervaloTurno = new Intervalo($horaInicioTrabajo, $horaFinTrabajo);
                            if ($intervaloTrabajo->dentroDe($intervaloTurno)) {
                                // El empleado trabajó dentro del turno correspondiente
                                $turnoMOk = true;
                                $horaInicioTrabajo = Carbon::parse($dia->horaInicioM)->format('H:i:s');
                                $horaFinTrabajo = Carbon::parse($dia->horaFinM)->format('H:i:s');
                            } else {
                                // El empleado no trabajó dentro del turno correspondiente
                                $turnoMOk = false;
                            }
                        }

                        if ($turnoT) {
                            $horaInicioTrabajo = Carbon::parse($dia->horaInicioT)->format('H:i:s');
                            $horaFinTrabajo = Carbon::parse($dia->horaFinT)->format('H:i:s');
                            $intervaloTrabajo = new Intervalo($horaLlegadaEmpleado, $horaSalidaEmpleado);
                            $intervaloTurno = new Intervalo($horaInicioTrabajo, $horaFinTrabajo);
                            if ($intervaloTrabajo->dentroDe($intervaloTurno)) {
                                // El empleado trabajó dentro del turno correspondiente
                                $turnoTOk = true;
                                $horaInicioTrabajo = Carbon::parse($dia->horaInicioT)->format('H:i:s');
                                $horaFinTrabajo = Carbon::parse($dia->horaFinT)->format('H:i:s');
                            } else {
                                // El empleado no trabajó dentro del turno correspondiente
                                $turnoTOk = false;
                            }
                        }

                        if ($tiempo->fin) {
                            // Entrada
                            if ($horaLlegadaEmpleado > $horaInicioTrabajo) {
                                // El empleado llegó tarde
                                $retrasoEntrada = true;
                                $adelantoEntrada = false;
                                $diferenciaSegundosEntrada = Carbon::parse($horaLlegadaEmpleado)->diffInSeconds(
                                    $horaInicioTrabajo
                                );
                                $signo = '-';
                            } else {
                                // El empleado llegó temprano o a tiempo
                                $retrasoEntrada = false;
                                $adelantoEntrada = true;
                                $diferenciaSegundosEntrada = Carbon::parse($horaInicioTrabajo)->diffInSeconds(
                                    $horaLlegadaEmpleado
                                );
                                $signo = '';
                            }
                            $diferenciaFormateadaEntrada = $signo . gmdate(
                                    'H:i:s',
                                    abs($diferenciaSegundosEntrada)
                                );

                            //Salida
                            if ($horaSalidaEmpleado < $horaFinTrabajo) {
                                // El empleado salió antes de la hora
                                $retrasoSalida = false;
                                $adelantoSalida = true;
                                $diferenciaSegundosSalida = Carbon::parse($horaSalidaEmpleado)->diffInSeconds(
                                    $horaFinTrabajo
                                );
                                $signo = '-';
                            } else {
                                // El empleado salió después de la hora o en punto.
                                $retrasoSalida = true;
                                $adelantoSalida = false;
                                $diferenciaSegundosSalida = Carbon::parse($horaFinTrabajo)->diffInSeconds(
                                    $horaSalidaEmpleado
                                );
                                $signo = '';
                            }

                            $diferenciaFormateadaSalida = $signo . gmdate('H:i:s', abs($diferenciaSegundosSalida));

                            // Obtener las horas que debía trabajar en un día
                            $horasDeberTrabajar = Carbon::parse($dia->horaInicioM)->diffInSeconds(
                                Carbon::parse($dia->horaFinM)
                            );

                            // Obtener las horas trabajadas
                            $horasTrabajadas = Carbon::parse($horaSalidaEmpleado)->diffInSeconds(
                                Carbon::parse($horaLlegadaEmpleado)
                            );

                            // Calcular la diferencia
                            $diferenciaSegundos = $horasDeberTrabajar - $horasTrabajadas;

                            if ($diferenciaSegundos > 0) {
                                // El empleado trabajó menos horas de las que debía
                                $retrasoDia = true;
                                $adelantoDia = false;
                                $signo = '-';
                            } elseif ($diferenciaSegundos < 0) {
                                // El empleado trabajó más horas de las que debía
                                $retrasoDia = false;
                                $adelantoDia = true;
                                $signo = '';
                            } else {
                                // El empleado trabajó las horas que debía
                                $retrasoDia = false;
                                $adelantoDia = false;
                                $signo = '';
                            }
                            $diferenciaFormateadaDia = $signo . gmdate('H:i:s', abs($diferenciaSegundos));

                            $tiempo->mes = DiasMeses::getMonthName(date('n', strtotime($tiempo->inicio)));
                            $tiempo->diaSemana = DiasMeses::getDaysOfWeek($dia->diaSemana);
                            $tiempo->descripcionTruno = $turno->descripcion;
                            $tiempo->horaLlegadaEmpleado = $horaLlegadaEmpleado;
                            $tiempo->horaInicioTrabajo = $horaInicioTrabajo;
                            $tiempo->diferenciaEntrada = $diferenciaFormateadaEntrada;
                            $tiempo->horaSalidaEmpleado = $horaSalidaEmpleado;
                            $tiempo->horaFinTrabajo = $horaFinTrabajo;
                            $tiempo->diferenciaSalida = $diferenciaFormateadaSalida;
                            $tiempo->diferenciaDia = $diferenciaFormateadaDia;
                            $tiempo->retrasoDia = $retrasoDia;
                            $tiempo->adelentoDia = $adelantoDia;
                            $tiempo->turnoMañana = $turnoM;
                            $tiempo->turnoTarde = $turnoT;
                            $tiempo->turnoNoche = $turnoN;
                            $tiempo->turnoMañanaOK = $turnoMOk;
                            $tiempo->turnoTardeOK = $turnoTOk;
                            //$tiempo->dias = $dia;
                        } else {
                            $tiempo->mes = DiasMeses::getMonthName(date('n', strtotime($tiempo->inicio)));
                            $tiempo->diaSemana = DiasMeses::getDaysOfWeek($dia->diaSemana);
                            $tiempo->empleadoOnline = true;
                            $tiempo->descripcionTruno = $turno->descripcion;
                            $tiempo->horaLlegadaEmpleado = $horaLlegadaEmpleado;
                            $tiempo->horaInicioTrabajo = $horaInicioTrabajo;
                            $tiempo->diferenciaEntrada = $diferenciaFormateadaEntrada;
                        }
                    } else {
                        //No tiene turno ese día.
                    }
                }
            }
            $data = [
                'empleado_id' => $empleado->id,
                'empleado' => $empleado->nombre . " " . $empleado->apellidos,
                'empresa_id' => $empleado->empresa_id,
                'empresa' => $empresa->nombreComercial,
                'tiempos' => $tiempos,
            ];
        } else {
            $data = ['message' => $loginOk['message'],];
        }
        return response()->json($data);
    }

    public function empleadoOnline($empleadoId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);

        if ($loginOk) {
            $tiempo = Tiempo::where('empleado_id', $empleadoId)->where('fin', null)->get();
//            if ($tiempo->count() > 0) {
            return response()->json($tiempo);
//            } else {
//                $empleado = DB::table('empleados')->where('id', $empleadoId)->first();
//                $data = [
//                    'message' => 'El empleado '.$empleado->nombre. ' '. $empleado->apellidos. ' no está online',
//                ];
//                return response()->json($data);
//            }
        } else {
            $data = ['message' => $loginOk['message'],];
            return response()->json($data);
        }
    }

    public function empleadosOnline()
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);

        if (is_numeric($empresaId)) {
            //Obtener los empleados con fin igual a null que pertenezcan a la empresa autenticada
            $empleados = Tiempo::where('fin', null)
                ->whereHas('empleado', function ($query) use ($empresaId) {
                    $query->where('empresa_id', $empresaId);
                })
                ->with([
                    'empleado' => function ($query) {
                        $query->select('id', 'nombre', 'apellidos', 'empresa_id', 'email', 'nif', 'telefono');
                    }
                ])
                ->get();

            // Verificar si se encontraron empleados y retornar la respuesta JSON
            if ($empleados->count() > 0) {
                $resultados = [];
                foreach ($empleados as $empleado) {
                    $turnoActivo = DB::table('empleados_turnos')
                        ->where('empleado_id', $empleado->empleado_id)
                        ->where('activo', true)
                        ->first();
                    $diaSemanaNumero = Carbon::parse($empleado->inicio)->format('N');
                    $dia = DB::table('dias')
                        ->where('turno_id', $turnoActivo->turno_id)
                        ->where('diaSemana', $diaSemanaNumero)
                        ->first();
                    $horaLlegadaEmpleado = Carbon::parse($empleado->inicio)->format('H:i:s');

                    // Aquí hay que buscar la horaInicio según el turno y si es mañana o tarde.
                    //$horaInicioTrabajo = Carbon::parse(Auxiliares::determinarTurno($dia, $horaLlegadaEmpleado))->format('H:i:s');
                    $horaInicioTrabajo = Carbon::parse($dia->horaInicioM)->format('H:i:s');

                    if ($horaLlegadaEmpleado > $horaInicioTrabajo) {
                        // El empleado llegó tarde
                        $retraso = true;
                        $adelanto = false;
                        $diferenciaSegundos = Carbon::parse($horaLlegadaEmpleado)->diffInSeconds(
                            $horaInicioTrabajo
                        );
                        $signo = '-';
                    } else {
                        // El empleado llegó temprano o a tiempo
                        $retraso = false;
                        $adelanto = true;
                        $diferenciaSegundos = Carbon::parse($horaInicioTrabajo)->diffInSeconds(
                            $horaLlegadaEmpleado
                        );
                        $signo = '';
                    }
                    $diferenciaFormateada = $signo . gmdate('H:i:s', abs($diferenciaSegundos));
                    $resultados[] = [
                        'empresa_id' => $empleado->empleado->empresa_id,
                        'empleado_id' => $empleado->empleado_id,
                        'nombre' => $empleado->empleado->nombre,
                        'apellidos' => $empleado->empleado->apellidos,
                        'nif' => $empleado->empleado->nif,
                        'email' => $empleado->empleado->email,
                        'telefono' => $empleado->empleado->telefono,
                        'inicio' => $empleado->inicio,
                        'horaInicioTrabajo' => $horaInicioTrabajo,
                        'diferencia' => $diferenciaFormateada,
                        'retraso' => $retraso,
                        'adelanto' => $adelanto,
                        'diaSemana' => $diaSemanaNumero,
                        'turnoActivo' => $turnoActivo->turno_id,
                    ];
                }
                return response()->json($resultados);
            } else {
                return response()->json(
                    ['message' => 'No se encontraron empleados OnLine pertenecientes a la empresa autenticada.'],
                );
            }
        } else {
            $data = ['message' => $empresaId['message'],];
        }
        return response()->json($data);
    }

    /*
     * tiempoActivo: tiempo activo en el día actual.
     */
    public function tiempoActivo($empleadoId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);

        if ($loginOk === true) {
            $hoy = Carbon::now();
            $horario = [];
            $empleado = DB::table('empleados')
                ->where('id', $empleadoId)
                ->first();
            //Comprobar que el empleado tenga un turno asignado.
            $empleadoTurno = DB::table('empleados_turnos')
                ->where('empleado_id', $empleado->id)
                ->where('activo', true)
                ->first();
            if (!is_null($empleadoTurno)) {
                // Buscamos los tiempos registrados hoy para el empleadoId.
                $tiempos = DB::table('tiempos')
                    ->where('empleado_id', $empleado->id)
                    ->whereDate('inicio', $hoy)
                    ->orderBy('inicio', 'asc')
                    ->get();
                $diaSemanaNumero = Carbon::parse($hoy)->format('N');
                $dia = DB::table('dias')
                    ->where('turno_id', $empleadoTurno->turno_id)
                    ->where('diaSemana', $diaSemanaNumero)
                    ->first();
                $tiempoATrabajar = Intervalo::sumaHorasIntervalos($dia);
                $tiempoTrabajado = 0;

                if ($tiempos->count() > 0) {
                    foreach ($tiempos as $tiempo) {
                        if ($tiempo->fin != null) {
                            $tiempoTrabajado += Carbon::parse($tiempo->fin)->diffInSeconds(
                                Carbon::parse($tiempo->inicio)
                            );
                            $horario[] = [
                                'inicio' => Carbon::parse($tiempo->inicio)->format('H:i:s'),
                                'fin' => Carbon::parse($tiempo->fin)->format('H:i:s'),
                            ];
                        } else {
                            $tiempoTrabajado += $hoy->diffInSeconds($tiempo->inicio);
                            $horario[] = [
                                'inicio' => Carbon::parse($tiempo->inicio)->format('H:i:s'),
                                'fin' => null,
                            ];
                        }
                    }
                    if ($tiempoATrabajar == "00:00:00") {
                        $mensaje = "No existe turno para hoy.";
                    } else {
                        $mensaje = "Existe turno para hoy.";
                    }

                    $data = [
                        'mensaje' => $mensaje,
                        'fecha' => $hoy->format('d-m-Y'),
                        'hora' => $hoy->format('H:i:s'),
                        'empleado_id' => $empleado->id,
                        'empleado' => $empleado->nombre . " " . $empleado->apellidos,
                        'jornadaLaboral' => $tiempoATrabajar,
                        'tiempoActivo' => gmdate('H:i:s', $tiempoTrabajado),
                        'horario' => $horario,
                    ];
                    return response()->json($data);
                } else {
                    $data = [
                        '$empleadoTurno' => $empleadoTurno,
                        '$dia' => $dia,
                        'mensaje' => 'No has iniciado sesión',
                        'fecha' => $hoy->format('d-m-Y'),
                        'hora' => $hoy->format('H:i:s'),
                        'empleado_id' => $empleado->id,
                        'empleado' => $empleado->nombre . " " . $empleado->apellidos,
                        'jornadaLaboral' => $tiempoATrabajar,
                        'tiempoActivo' => gmdate('H:i:s', 0),
                        'horario' => $horario,
                    ];
                    return response()->json($data);
                }
            } else {
                $data = ['message' => 'El empleado no tiene turno activo',];
                return response()->json($data, 400);
            }
        } else {
            $data = ['message' => $loginOk['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public
    function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $primaryKey = $user->getKey();
        // Soy un empleado y mi id coincide con el id del empleado de la request.
        if ($user instanceof Empleado && $primaryKey == $request->empleado_id) {
            return $this->extracted($request);
            // Si soy empresa o empleado administrador y quiero insertar un tiempo a otro empleado de la empresa.
        } elseif ($user instanceof Empresa || $user->tipoEmpleado === "Administrador") {

            //$empleado = DB::table('empleados')->where('id', $request->empleado_id)->first();
            //$empresa = DB::table('empresas')->where('id', )
            //if ($empleado->empresa_id === $user->empresa_id || ) {
                return $this->extracted($request);
            //} else {
              //  $data = ['message' => 'El empleado no pertenece a la empresa.',];
                //return response()->json($data);
           // }
        } else {
            $data = ['message' => 'No autorizado',];
            return response()->json($data);
        }
    }


    /**
     * Update the specified resource in storage.
     * Dos situaciones
     * 1-Insertar por parte del empleado el tiempo final
     * 2-Actualizar por parte de Empresa o administrador el tiempo.
     */
    public function update(Request $request, $tiempoId)
    {
        $user = Auth::user();
        $primaryKey = $user->getKey();
        $tiempo = Tiempo::find($tiempoId);
        // Comprobar que el tiempo exista
        if ($tiempo) {
            // Comprobar que el tiempo corresponda con el empleado
            if ($request->empleado_id === $tiempo->empleado_id) {
                if ($user instanceof Empresa) {
                    $empresa = DB::table('empresas')->where('id', $primaryKey)->first();
                    $empleado = Empleado::where('id', $request->empleado_id)
                        ->where('empresa_id', $empresa->id)
                        ->first();
                    if ($empleado) {
                        //if (Auxiliares::esElMismoDia($request->inicio, $tiempo->inicio)){
                        $tiempo->inicio = $request->inicio;
                        $tiempo->fin = $request->fin;
                        $tiempo->save();
                        $data = [
                            'message' => 'Tiempo actualizado correctamente',
                            'tiempo' => $tiempo
                        ];
                        return response()->json($data);
                    } else {
                        $data = ['message' => 'Error, el empleado no pertenece a la empresa',];
                        return response()->json($data);
                    }
                } else {
                    if ($user instanceof Empleado) {
                        $empleado = Empleado::where('id', $request->empleado_id)
                            ->where('empresa_id', $user->empresa_id)
                            ->first();
                        if ($empleado && $empleado->tipoEmpleado === "Administrador") {
                            $tiempo->inicio = $request->inicio;
                            $tiempo->fin = $request->fin;
                            $tiempo->save();
                            $data = [
                                'message' => 'Tiempo actualizado correctamente',
                                'tiempo' => $tiempo,
                            ];
                            return response()->json($data);
                        } elseif ($empleado && $empleado->tipoEmpleado === "Trabajador") {
                            $tiempo->fin = $request->fin;
                            $tiempo->save();
                            $data = [
                                'message' => 'Tiempo actualizado correctamente',
                                'tiempo' => $tiempo,
                            ];
                            return response()->json($data);
                        } else {
                            $data = ['message' => 'Error, el empleado no pertenece a la empresa',];
                            return response()->json($data);
                        }
                    } else {
                        $data = [
                            'message' => 'Error no controlado',
                        ];
                        return response()->json($data);
                    }
                }
            } else {
                $data = ['message' => 'Error el tiempo no corresponde con el empleado',];
                return response()->json($data);
            }
        } else {
            $data = [
                'message' => 'Tiempo no existe'
            ];
            return response()->json($data);
        }
    }


    /**
     * Remove the specified resource from storage.
     * Puede eliminarlo una Empresa o un empleado Administrador.
     */
    public function destroy($tiempoId)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            //Comprobar que el tiempo pertenezca al usuario logueado.
            $tiempo = Tiempo::find($tiempoId);
            if ($tiempo) {
                $empleado = DB::table('empleados')->where('id', $tiempo->empleado_id)->first();
                // Comprobar que el empleado pertenezca a la empresa del usuario logueado.
                if ($empleado->empresa_id === $empresaId) {
                    $tiempo->delete();
                    $data = [
                        'message' => 'Tiempo eliminado correctamente',
                        'tiempo' => $tiempo
                    ];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'El empleado no pertenece a la empresa'];
                    return response()->json($data, 400);
                }
            } else {
                $data = ['message' => 'Tiempo no existe'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    public function mostrarTiempo($tiempoId)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            //Comprobar que el tiempo pertenezca al usuario logueado.
            $tiempo = Tiempo::find($tiempoId);
            if ($tiempo) {
                $empleado = DB::table('empleados')->where('id', $tiempo->empleado_id)->first();
                // Comprobar que el empleado pertenezca a la empresa del usuario logueado.
                if ($empleado->empresa_id === $empresaId) {
                    $data = [
                        'tiempo' => $tiempo,
                    ];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'El empleado no pertenece a la empresa'];
                    return response()->json($data, 400);
                }
            } else {
                $data = ['message' => 'Tiempo no existe'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function extracted(Request $request): \Illuminate\Http\JsonResponse
    {
        $tiempo = new Tiempo();
        $tiempo->empleado_id = $request->empleado_id;
        $tiempo->inicio = $request->inicio;
        $tiempo->fin = $request->fin;
        $tiempo->turno_id = $request->turno_id;
        $tiempo->save();
        $data = [
            'message' => 'Tiempo insertado correctamente',
            'tiempo' => $tiempo
        ];
        return response()->json($data);
    }
}
