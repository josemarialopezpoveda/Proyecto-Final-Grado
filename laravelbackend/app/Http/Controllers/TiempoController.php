<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tiempo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

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

//        $user = Auth::user();
//        if ($user instanceof Empresa))
//        if ($user->tipoEmpleado != 'Trabajador'){
//            if ($user instanceof Empresa) {
//                $empresaId = $user->getKey();
//            } elseif ($user->tipoEmpleado == 'Administrador') {
//                $empresaId = $user->empresa_id;
//            }
//
//         // Verificamos si el usuario es una empresa o un empleado
//        if ($user->tipoEmpleado === 'Administrador') {
//            // Si el usuario es un Administrador, verificamos si pertenece a la misma empresa que el empleado solicitado
//            $empleado = Empleado::find($idEmpleado);
//            if (!$empleado || $empleado->empresa_id !== $user->empresa_id) {
//                return response()->json(['message' => 'El empleado solicitado no pertenece a la empresa del usuario autenticado'], Response::HTTP_UNAUTHORIZED);
//            }
//        } elseif ($user->tipoEmpleado === 'Trabajador') {
//            // Si el usuario es un Trabajador, verificamos si su ID es igual al ID del empleado solicitado
//            if ($user->id != $idEmpleado) {
//                return response()->json(['message' => 'El empleado solicitado no coincide con el usuario autenticado'], Response::HTTP_UNAUTHORIZED);
//            }
//        } else {
//            // Si el usuario no es ni un Administrador ni un Trabajador, no tiene permisos para acceder a la información del empleado
//            return response()->json(['message' => 'El usuario autenticado no tiene permisos para acceder a la información del empleado'], Response::HTTP_UNAUTHORIZED);
//        }
//
//        // Obtenemos el tiempo más reciente del empleado
//        $tiempo = Tiempo::where('empleado_id', $idEmpleado)->latest()->first();
//
//        // Verificamos si el empleado está Online u Offline basado en la columna "fin" de la tabla "tiempos"
//        $estado = $tiempo && $tiempo->fin === null ? 'Online' : 'Offline';
//
////        // Preparamos la respuesta con la información solicitada
////        $response = [
////            'estado' => $estado,
////            'nombre' => $tiempo->empleado->nombre,
////            'apellidos' => $tiempo->empleado->apellidos,
////            'idEmpleado' => $tiempo->empleado->id,
////            'nombreEmpresa' => $tiempo->empleado->empresa->nombre,
////            'idEmpresa' => $tiempo->empleado->empresa->id,
////            'inicio' => $tiempo->inicio
////        ];
//
//        return response()->json(['estado' => $estado]);
        $user = Auth::user();
//        if ($user->tipoEmpleado != 'Trabajador') {
//            if ($user instanceof Empresa) {
//                $empresaId = $user->getKey();
//            } elseif ($user->tipoEmpleado == 'Administrador') {
//                $empresaId = $user->empresa_id;
//            }
//
//
//        }
        $tiempo = Tiempo::where('empleado_id', $idEmpleado)->where('fin', null)->get();
        return response()->json($tiempo);
    }

    public function empleadosOnline()
    {
        $user = Auth::user();

        if ($user->tipoEmpleado != 'Trabajador'){
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
                        $query->select('id', 'nombre', 'apellidos', 'empresa_id', 'email', 'nif');
                    }
                ])
                ->get();

            // Obtener los campos necesarios y renombrarlos en la respuesta JSON
            $empleados = $empleados->map(function ($item) {
                return [
                    'empresa_id' => $item->empleado->empresa_id,
                    'empleado_id' => $item->empleado_id,
                    'nombre' => $item->empleado->nombre,
                    'apellidos' => $item->empleado->apellidos,
                    'nif' => $item->empleado->nif,
                    'e-mail' => $item->empleado->email,
                    'inicio' => $item->inicio,
                ];
            });

            // Convertir la colección a un array
            $empleados = $empleados->toArray();

            // Verificar si se encontraron empleados y retornar la respuesta JSON
            if (!empty($empleados)) {
                return response()->json($empleados);
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
