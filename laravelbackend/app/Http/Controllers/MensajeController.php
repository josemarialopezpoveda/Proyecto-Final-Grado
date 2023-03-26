<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mensaje = Mensaje::all();
        return response()->json($mensaje);
    }

    public function show($id)
    {
        $mensaje = Mensaje::find($id);
        return response()->json($mensaje);
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
        $mensaje = new Mensaje();
        $mensaje->casos_id = $request->casos_id;
        $mensaje->emisor = $request->emisor;
        $mensaje->receptor = $request->receptor;
        $mensaje->mensaje = $request->mensaje;
        $mensaje->horaEnvio = $request->horaEnvio;
        $mensaje->created_at = $request->horaEnvio;
        $mensaje->updated_at = $request->horaEnvio;

        $mensaje->save();
        $data = [
            'message' => 'Tipo de ausencia creado correctamente',
            'tipo de ausencia' => $mensaje
        ];
        return response()->json($data);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mensaje $mensaje)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mensaje = Mensaje::find($id);
        if ($mensaje){
            $mensaje->casos_id = $request->casos_id;
            $mensaje->emisor = $request->emisor;
            $mensaje->receptor = $request->receptor;
            $mensaje->mensaje = $request->mensaje;
            $mensaje->horaEnvio = $request->horaEnvio;
            $mensaje->updated_at = $request->horaEnvio;
            $mensaje->save();
            $data = [
                'message' => 'Mensaje actualizado correctamente',
                'mensaje' => $mensaje
            ];
        }
        else {
            $data = [
                'message' => 'Mensaje no existe'
            ];
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mensaje = Mensaje::find($id);
        if ($mensaje){
            $ultimo  = Mensaje::where('casos_id', $mensaje->casos_id)->orderBy('id', 'desc')->first();
            if ($mensaje->id === $ultimo->id){
                $mensaje->delete();
                $data = [
                    'message' => 'Mensaje eliminado correctamente',
                    'mensaje' => $mensaje
                ];
            }
            else{
                $data = [
                    'message' => 'No se puede eliminar, no es el último mensaje.'

                ];
            }

        }
        else {
            $data = [
                'message' => 'Mensaje no existe'
            ];
        }
        return response()->json($data);
    }
}
