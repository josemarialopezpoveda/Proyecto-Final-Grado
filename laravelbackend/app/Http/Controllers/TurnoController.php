<?php

namespace App\Http\Controllers;

use App\Models\Dia;
use App\Models\Turno;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TurnoController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $turnos = Turno::with('dias')->get();
        return response()->json($turnos);
    }

    /**
     * Display the specified resource.
     *
     * @param Turno $turno
     * @return JsonResponse
     */
    public function show(Turno $turno)
    {
        $turnos = Turno::with('dias')->find($turno->id);
        return response()->json($turnos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $turno = new Turno;
        $turno->descripcion = $request->descripcion;
        $turno->save();

        for ($i = 0; $i < count($request->dias); $i++) {
            $dia = new Dia;
            $dia["turno_id"] = $turno->id;
            $dia["diaSemana"] = $request->dias[$i]["diaSemana"];
            $dia["horaInicioM"] = $request->dias[$i]["horaInicioM"];
            $dia["horaFinM"] = $request->dias[$i]["horaFinM"];
            $dia["horaInicioT"] = $request->dias[$i]["horaInicioT"];
            $dia["horaFinT"] = $request->dias[$i]["horaFinT"];
            $dia["horaInicioN"] = $request->dias[$i]["horaInicioN"];
            $dia["horaFinN"] = $request->dias[$i]["horaFinN"];
            $dia->save();
            $turno->dias[$i] = $dia;
        }
        $data = [
            'message' => 'Turno creado correctamente',
            'turno' => $turno
        ];
        return response()->json($data);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param Turno $turno
     * @return Response
     */
    public function edit(Turno $turno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Turno $turno
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $turno = Turno::with('dias')->find($id);
        if ($turno) {
            $turno->descripcion = $request->descripcion;
            $turno->save();
            for ($i = 0; $i < count($request->dias); $i++) {
                $dia = Dia::find($turno->dias[$i]->id);
                $dia["diaSemana"] = $request->dias[$i]["diaSemana"];
                $dia["horaInicioM"] = $request->dias[$i]["horaInicioM"];
                $dia["horaFinM"] = $request->dias[$i]["horaFinM"];
                $dia["horaInicioT"] = $request->dias[$i]["horaInicioT"];
                $dia["horaFinT"] = $request->dias[$i]["horaFinT"];
                $dia["horaInicioN"] = $request->dias[$i]["horaInicioN"];
                $dia["horaFinN"] = $request->dias[$i]["horaFinN"];
                $dia->save();
                $turno->dias[$i] = $dia;
            }
            $data = [
                'message' => 'Turno actualizado correctamente',
                'turno' => $turno
            ];
        }
        else {
            $data = [
                'message' => 'Turno no existe'
            ];
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Turno $turno
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $turno = Turno::find($id);
        if ($turno) {
            $turno->delete();
            $data = [
                'message' => 'Turno eliminado correctamente',
                'turno' => $turno
            ];
        } else {
            $data = [
                'message' => 'Turno no existe'
            ];
        }
        return response()->json($data);


//
//        return response()->json($data);
    }

    /*public function attach(Request $request): \Illuminate\Http\JsonResponse
    {
        $turno = Turno::find($request->turno_id);
        $turno->horarios()->attach($request->horario_id);
        $data = [
            'message'=>'Horario attached correctamente',
            'turno' => $turno
        ];
        return response()->json($data);
    }*/
}
