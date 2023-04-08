<?php

namespace App\Http\Controllers;

use App\Models\Caso;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Mensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MensajeController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->cif || $user->tipoEmpleado === 'Administrador') {
            if ($user->cif) {
                $empresa = Empresa::find($user->id);
            } else {
                $empresa = Empresa::find($user->empresa_id);
            }
            $mensajes = Mensaje::where('empresa_id', $empresa->id)->get(); //Devuelve los empleados de la empresa logueada.
            if (count($mensajes) != 0) {
                $data = [
                    'message' => 'Mensajes de la empresa ' . $empresa->id,
                    'mensajes' => $mensajes,
                ];
            } else {
                $data = [
                    'message' => 'La empresa no tiene mensajes.',
                ];
            }
        } else {
            $data = [
                'message' => 'No autorizado'
            ];
        }
        return response()->json($data);
    }

    public function show($casoId)
    {
        $user = Auth::user();
        $caso = Caso::find($casoId);
        if (!$caso) {
            $data = [
                'message' => 'El caso no existe',
            ];
        } else {
            $empleado = Empleado::find($caso->empleado_id);
            if ($user->cif || $user->tipoEmpleado === 'Administrador') {  //Compruebo que el usuario logueado es una empresa.
                if ($user->cif) {
                    $empresa = Empresa::find($user->id);
                } else {
                    $empresa = Empresa::find($user->empresa_id);
                }

                if ($empleado->empresa_id === $empresa->id) {
                    $mensajes = Mensaje::where('casos_id', $casoId)->get();
                    if (count($mensajes) != 0) {
                        $data = [
                            'message' => 'Mensajes del caso ' . $caso->id,
                            'mensajes' => $mensajes
                        ];
                    } else {
                        $data = [
                            'message' => 'El caso no tiene mensajes.'
                        ];
                    }
                } else {
                    $data = [
                        'message' => 'No estás autorizado.',
                    ];
                }
            } else {
                $mensajes = Mensaje::where('casos_id', $casoId)->get();
                if (count($mensajes) != 0) {
                    $existeUser = false;
                    foreach ($mensajes as $mensaje) {
                        if (($mensaje->emisor === $user->id) || ($mensaje->receptor === $user->id)) {
                            $existeUser = true;
                            break;
                        }
                    }
                    if ($existeUser) {
                        $data = [
                            'message' => 'Mensajes del caso ' . $caso->id,
                            'mensajes' => $mensajes
                        ];
                    } else {
                        $data = [
                            'message' => 'No estás autorizado.',
                        ];
                    }
                } else {
                    $data = [
                        'message' => 'El caso no tiene mensajes.'
                    ];
                }
            }
        }
        return response()->json($data);
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
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'empresa_id' => 'required|exists:empresas,id',
            'casos_id' => 'required|exists:casos,id',
            'emisor' => 'required|integer',
            'receptor' => 'required|integer',
            'mensaje' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error, hay campos con errores de validación',
                'errores' => $validator->errors()->all()
            ];
        }

        //if ($user->id == $request['empleado_id']) {

            $mensaje = new Mensaje();
            $mensaje->empresa_id = $request['empresa_id'];
            $mensaje->casos_id = $request['casos_id'];
            $mensaje->emisor = $request['emisor'];
            $mensaje->receptor = $request['receptor'];
            $mensaje->mensaje = $request['mensaje'];
            $mensaje->horaEnvio = Carbon::now();
            $mensaje->save();

            $data = [
                'message' => 'Mensaje creado correctamente',
                'mensaje' => $mensaje,
            ];
//        } else {
//            $data = [
//                'message' => 'El ID del empleado no coincide con el usuario autenticado.',
//            ];
//        }


        return response()->json($data);

//        $mensaje = new Mensaje();
//        $mensaje->empresa_id = $request->empresa_id;
//        $mensaje->casos_id = $request->casos_id;
//        $mensaje->emisor = $request->emisor;
//        $mensaje->receptor = $request->receptor;
//        $mensaje->mensaje = $request->mensaje;
//        $mensaje->horaEnvio = $request->horaEnvio;
//        $mensaje->created_at = $request->horaEnvio;
//        $mensaje->updated_at = $request->horaEnvio;
//
//        $mensaje->save();
//        $data = [
//            'message' => 'Mensaje creado correctamente',
//            'mensaje' => $mensaje
//        ];
//        return response()->json($data);
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
        if ($mensaje) {
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
        } else {
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
        if ($mensaje) {
            $ultimo = Mensaje::where('casos_id', $mensaje->casos_id)->orderBy('id', 'desc')->first();
            if ($mensaje->id === $ultimo->id) {
                $mensaje->delete();
                $data = [
                    'message' => 'Mensaje eliminado correctamente',
                    'mensaje' => $mensaje
                ];
            } else {
                $data = [
                    'message' => 'No se puede eliminar, no es el último mensaje.'

                ];
            }
        } else {
            $data = [
                'message' => 'Mensaje no existe'
            ];
        }
        return response()->json($data);
    }
}
