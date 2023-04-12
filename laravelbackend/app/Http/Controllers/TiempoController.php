<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tiempo;
use Illuminate\Http\Request;
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

    public function empleadoOnline($id)
    {
        //$user = Auth::user();
        $tiempo = Tiempo::where('empleado_id', $id)->where('fin', null)->get();
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
                        $query->select('id', 'nombre', 'apellidos', 'empresa_id');
                    }
                ])
                ->get();

            // Obtener los campos necesarios y renombrarlos en la respuesta JSON
            $empleados = $empleados->map(function ($item) {
                return [
                    'empleado_id' => $item->empleado_id,
                    'nombre' => $item->empleado->nombre,
                    'apellidos' => $item->empleado->apellidos,
                    'inicio' => $item->inicio,
                    'empresa_id' => $item->empleado->empresa_id
                ];
            });

            // Convertir la colección a un array
            //$empleados = $empleados->toArray();

            // Verificar si se encontraron empleados y retornar la respuesta JSON
            if (!empty($empleados)) {
                return response()->json($empleados);
            } else {
                return response()->json(
                    ['message' => 'No se encontraron empleados con fin nulo pertenecientes a la empresa autenticada.'],
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
        $empleado = Empleado::find($request->id);
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
