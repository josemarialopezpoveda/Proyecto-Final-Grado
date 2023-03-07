<?php

namespace App\Http\Controllers;

use App\Models\Ausencia;
use App\Models\Empleado;
use App\Models\Tipoausencia;
use Illuminate\Http\Request;

class AusenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ausencias = Ausencia::with('tipoausencias')->get();
        return response()->json($ausencias);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ausencia = Ausencia::with('tipoausencias')->find($id);
        return response()->json($ausencia);
    }

    public function ausenciasEmpleados()
    {
        $empleado = new Empleado;
        $ausencia = Ausencia::all();
        $listaEmpleados = array();
        for ($i = 0; $i < count($ausencia); $i++) {
            if (!(in_array($ausencia[$i]->empleado_id, $listaEmpleados))) {
                $listaEmpleados[$i] = $ausencia[$i]->empleado_id;
                $aux = Empleado::find($ausencia[$i]->empleado_id);
                $empleado[$i] = $aux;
            }
        }

        $data = [
            'message' => 'Ausencias por empleado',
            'ausencias' => $ausencia,
            'empleados' => $empleado
        ];
        return response()->json($data);
    }


    public function ausenciasEmpleado($id)
    {
        $empleado = Empleado::find($id);
        $ausencia = Ausencia::where('empleado_id', $empleado->id)->get();

        if (count($ausencia) === 0) {
            $data = [
                'message' => 'El empleado no tiene ausencias',
                'cantidad de ausencias' => count($ausencia),
                'empleado' => $empleado
            ];
        } else {
            $data = [
                'message' => 'Ausencias de un empleado',
                'cantidad de ausencias' => count($ausencia),
                'empleado' => $empleado,
                'ausencias' => $ausencia
            ];
        }
        return response()->json($data);
    }

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
}
