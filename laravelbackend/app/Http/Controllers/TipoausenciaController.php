<?php

namespace App\Http\Controllers;

use App\Models\Tipoausencia;
use Illuminate\Http\Request;

class TipoausenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipoAusencia = Tipoausencia::all();
        return response()->json($tipoAusencia);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tipoAusencia = Tipoausencia::find($id);
        return response()->json($tipoAusencia);
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
        $tipoAusencia = new Tipoausencia();
        $tipoAusencia->descripcion = $request->descripcion;

        $tipoAusencia->save();
        $data = [
            'message' => 'Tipo de ausencia creado correctamente',
            'tipo de ausencia' => $tipoAusencia
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
        $tipoAusencia = Tipoausencia::find($id);
        if ($tipoAusencia){
            $tipoAusencia->descripcion = $request->descripcion;
            $tipoAusencia->save();
            $data = [
                'message' => 'Tipo de ausencia actualizado correctamente',
                'tipo de ausencia' => $tipoAusencia
            ];
        }
        else {
            $data = [
                'message' => 'Tipo de ausencia no existe'
            ];
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tipoAusencia = Tipoausencia::find($id);
        if ($tipoAusencia){
            $tipoAusencia->delete();
            $data = [
                'message' => 'Tipo de ausencia eliminado correctamente',
                'tipo de ausencia' => $tipoAusencia
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
