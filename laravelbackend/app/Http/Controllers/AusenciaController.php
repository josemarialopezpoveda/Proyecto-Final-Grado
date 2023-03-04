<?php

namespace App\Http\Controllers;

use App\Models\Ausencia;
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
        $ausencia = new Ausencia();
        $ausencia->tipoausencias_id = $request->tipoausencias_id;
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
        if ($ausencia){
            $ausencia->tipoausencias_id = $request->tipoausencias_id;
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
        }
        else{
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
        if ($ausencia){
            $ausencia->delete();
            $data = [
                'message' => 'Ausencia eliminada correctamente',
                'tipo de ausencia' => $ausencia
            ];
        }
        else {
            $data = [
                'message' => 'Tipo de ausencia no existe'
            ];
        }
        return response()->json($data);
    }
}
