<?php

namespace App\Http\Controllers;

use App\Helpers\Auxiliares;
use App\Models\Ausencia;
use App\Models\Empleado;
use App\Models\Tipoausencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AusenciaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function ausenciasEmpleados()
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);

        if (is_numeric($empresaId)) {
            // Obtener IDs de los empleados de la empresa
            $empleados = DB::table('empleados')
                ->where('empresa_id', $empresaId)
                ->select('id')
                ->get();

            $ausencias = DB::table('ausencias')
                ->whereIn('empleado_id', $empleados->pluck('id')->toArray())
                ->join('tipoausencias', 'ausencias.tipoausencias_id', '=', 'tipoausencias.id')
                ->join('empleados', 'ausencias.empleado_id', '=', 'empleados.id')
                ->select('ausencias.*', 'tipoausencias.descripcion as descripcionAusencia', 'tipoausencias.tipo as tipo','empleados.nombre as nombreEmpleado')
                ->get();


            $data =['ausencias' => $ausencias];
        } else {
            $data = ['message' => $empresaId['message'],];
        }
        return response()->json($data);

    }

    /**
     * Display the specified resource.
     */
    public function ausenciasEmpleado($empleadoId)
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);
        if ($loginOk === true) {
            $ausencias = DB::table('ausencias')
                ->where('empleado_id', $empleadoId)
                ->join('tipoausencias', 'ausencias.tipoausencias_id', '=', 'tipoausencias.id')
                ->join('empleados', 'ausencias.empleado_id', '=', 'empleados.id')
                ->select('ausencias.*', 'tipoausencias.descripcion as descripcionAusencia', 'tipoausencias.tipo as tipo','empleados.nombre as nombreEmpleado')
                ->get();
            if (count($ausencias)!=0){
                $data =['ausencias' => $ausencias];
            } else {
                $data =['message' => 'El empleado no tiene ausencias'];
            }

        } else {
            $data = ['message' => $loginOk['message'],];
        }
        return response()->json($data);
    }

//    public function ausenciasEmpleados()
//    {
//        $empleado = new Empleado;
//        $ausencia = Ausencia::all();
//        $listaEmpleados = array();
//        for ($i = 0; $i < count($ausencia); $i++) {
//            if (!(in_array($ausencia[$i]->empleado_id, $listaEmpleados))) {
//                $listaEmpleados[$i] = $ausencia[$i]->empleado_id;
//                $aux = Empleado::find($ausencia[$i]->empleado_id);
//                $empleado[$i] = $aux;
//            }
//        }
//
//        $data = [
//            'message' => 'Ausencias por empleado',
//            'ausencias' => $ausencia,
//            'empleados' => $empleado
//        ];
//        return response()->json($data);
//    }
//

//    public function ausenciasEmpleado($empleadoId)
//    {
//        if (Empleado::where('id', $empleadoId)->exists()) {
//            $empleado = Empleado::find($empleadoId);
//            $ausencias = Ausencia::where('empleado_id', $empleado->id)->get();
//
//            if (count($ausencias) === 0) {
//                $data = [
//                    'message' => 'El empleado no tiene ausencias',
//                    'cantidad de ausencias' => count($ausencias),
//                ];
//            } else {
//
//                // Crear un arreglo vacío para las ausencias
//                $ausenciasData = [];
//
//                // Iterar por cada ausencia y agregar los datos al arreglo
//                foreach ($ausencias as $ausencia) {
//                    $tipoAusencia = Tipoausencia::find($ausencia->tipoausencias_id);
//                    $nombreTipoAusencia = $tipoAusencia->tipo;
//                    $descripcionTipoAusencia = $tipoAusencia->descripcion;
//
//                    // Crear un objeto JSON para la ausencia actual
//                    $ausenciaData = [
//                        'tipo' => $nombreTipoAusencia,
//                        'descripcion' => $descripcionTipoAusencia,
//                        'ausencia' => $ausencia->descripcion,
//                        'fecha inicio' => $ausencia->fechaInicio,
//                        'fecha fin' => $ausencia->fechaFin,
//                        'justificada' => $ausencia->justificada,
//                    ];
//
//                    // Agregar el objeto JSON al arreglo de ausencias
//                    $ausenciasData[] = $ausenciaData;
//                }
//
//                // Crear el arreglo final con los datos
//                $data = [
//                    'message' => 'Ausencias de un empleado',
//                    'cantidad de ausencias' => count($ausencias),
//                    'ausencias' => $ausenciasData
//                ];
//
//
//            }
//        }
//        else{
//            $data = [
//                'message' => 'No se encontró el empleado con el ID proporcionado'
//            ];
//        }
//        return response()->json($data);
//    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ausencia = new Ausencia();
        $ausencia->tipoausencias_id = $request->tipoausencias_id;
        $ausencia->empleado_id = $request->empleado_id;
        $ausencia->descripcion = $request->descripcion;
        $ausencia->fechaInicio = $request->fechaInicio;
        $ausencia->fechaFin = $request->fechaFin;
        $ausencia->justificada = $request->justificada;

        $ausencia->save();

        $tipoAusencia = Tipoausencia::find($request->tipoausencias_id);
        $data = [
            'message' => 'Ausencia creada correctamente',
            'tipo de ausencia' => $tipoAusencia["descripcion"],
            'ausencia' => $ausencia
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
        $ausencia = Ausencia::find($id);
        if ($ausencia) {
            $ausencia->tipoausencias_id = $request->tipoausencias_id;
            $ausencia->empleado_id = $request->empleado_id;
            $ausencia->descripcion = $request->descripcion;
            $ausencia->fechaInicio = $request->fechaInicio;
            $ausencia->fechaFin = $request->fechaFin;
            $ausencia->justificada = $request->justificada;
            $ausencia->save();
            $tipoAusencia = Tipoausencia::find($request->tipoausencias_id);
            $data = [
                'message' => 'Ausencia modificada correctamente',
                'tipo de ausencia' => $tipoAusencia["descripcion"],
                'ausencia' => $ausencia
            ];
        } else {
            $data = [
                'message' => 'Ausencia no existe'
            ];
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ausencia = Ausencia::find($id);
        if ($ausencia) {
            $ausencia->delete();
            $data = [
                'message' => 'Ausencia eliminada correctamente',
                'tipo de ausencia' => $ausencia
            ];
        } else {
            $data = [
                'message' => 'Ausencia no existe'
            ];
        }
        return response()->json($data);
    }

    public function show ($idAusencia){


        //$user = Auth::user();
        //$empresaId = Auxiliares::verificarAutorizacionEmpresa($user);

        $ausencia = DB::table('ausencias')->where('id', $idAusencia)->first();

        if ($ausencia){
            $data = ['ausencia' => $ausencia,];
            return response()->json($data);
        } else {
            $data = ['message' => 'Ausencia no existe'];
            return response()->json($data, 404);
        }


    }
}
