<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Tiempo;
use Illuminate\Http\Request;

class TiempoController extends Controller
{
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
        $tiempo = Tiempo::where('empleado_id', $id)->where('fin', null)->get();
        return response()->json($tiempo);
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
        }else {
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
