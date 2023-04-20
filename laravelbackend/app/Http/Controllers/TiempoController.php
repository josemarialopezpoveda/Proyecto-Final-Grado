<?php

namespace App\Http\Controllers;

use App\Models\Dia;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tiempo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TiempoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tiempo = Tiempo::all();
        return response()->json($tiempo);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tiempo = Tiempo::where('empleado_id', $id)->get();
        return response()->json($tiempo);
    }

    public function empleadoOnline($idEmpleado)
    {
        $user = Auth::user();
        $empleado = Empleado::find($idEmpleado);
        if ($empleado) {
            $tiempo = Tiempo::where('empleado_id', $idEmpleado)->where('fin', null)->get();
            if ($tiempo) {
                if ($user instanceof Empresa && $empleado->empresa_id == $user->id) {
                    return response()->json($tiempo);
                } elseif ($user instanceof Empleado && $empleado->empresa_id == $user->empresa_id) {
                    $empleadoAutenticado = Empleado::find($user->id);
                    if ($empleadoAutenticado->tipoEmpleado == "Administrador") {
                        return response()->json($tiempo);
                    } elseif ($empleadoAutenticado->tipoEmpleado == "Trabajador" && $empleadoAutenticado->id == $idEmpleado) {
                        return response()->json($tiempo);
                    } else {
                        return response()->json(['message' => 'No estás autorizado.']);
                    }
                } else {
                    return response()->json(
                        ['message' => 'El empleado no pertenece a la empresa del usuario autenticado.']
                    );
                }
            } else {
                return response()->json(['message' => 'El empleado está offline']);
            }
        } else {
            return response()->json(['message' => 'El empleado solicitado no existe']);
        }
    }

    public function empleadosOnline()
    {
        $user = Auth::user();

        if ($user->tipoEmpleado != 'Trabajador') {
            if ($user instanceof Empresa) {
                $empresaId = $user->getKey();
            } elseif ($user->tipoEmpleado == 'Administrador') {
                $empresaId = $user->empresa_id;
            }

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
            if (!empty($empleados)) {
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
                    $horaInicioTrabajo = Carbon::parse($dia->horaInicioM)->format('H:i:s');

                    if ($horaLlegadaEmpleado > $horaInicioTrabajo) {
                        // El empleado llegó tarde
                        $retraso = true;
                        $adelanto = false;
                        $diferenciaSegundos = Carbon::parse($horaLlegadaEmpleado)->diffInSeconds($horaInicioTrabajo);
                        $signo = '-';
                    } else {
                        // El empleado llegó temprano o a tiempo
                        $retraso = false;
                        $adelanto = true;
                        $diferenciaSegundos = Carbon::parse($horaInicioTrabajo)->diffInSeconds($horaLlegadaEmpleado);
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
                    404
                );
            }
        } else {
            return response()->json(
                ['message' => 'No estás autorizado.'],
                404
            );
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tiempo = new Tiempo();
        $tiempo->empleado_id = $request->empleado_id;
        $tiempo->inicio = $request->inicio;
        $tiempo->fin = $request->fin;

        $tiempo->save();
        $data = [
            'message' => 'Tiempo insertado correctamente',
            'tiempo' => $tiempo
        ];
        return response()->json($data);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $tiempo = Tiempo::find($id);
        $empleado = Empleado::find($request->empleado_id);
        if ($empleado) {
            if ($tiempo) {
                $tiempo->empleado_id = $request->empleado_id;
                $tiempo->inicio = $request->inicio;
                $tiempo->fin = $request->fin;
                $tiempo->save();
                $data = [
                    'message' => 'Tiempo actualizado correctamente',
                    'tiempo' => $tiempo
                ];
            } else {
                $data = [
                    'message' => 'Tiempo no existe'
                ];
            }
        } else {
            $data = [
                'message' => 'Empleado no existe'
            ];
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tiempo = Tiempo::find($id);
        if ($tiempo) {
            $tiempo->delete();
            $data = [
                'message' => 'Tiempo eliminado correctamente',
                'tipo de ausencia' => $tiempo
            ];
        } else {
            $data = [
                'message' => 'Tiempo no existe'
            ];
        }
        return response()->json($data);
    }
}
