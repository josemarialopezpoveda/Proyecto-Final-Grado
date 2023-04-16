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
            $mensajes = Mensaje::where('empresa_id', $empresa->id)->get();
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


    public function showMensaje($mensajeId)
    {
        $user = Auth::user();
        $mensaje = Mensaje::find($mensajeId);
        if (!$mensaje) {
            $data = [
                'message' => 'El mensaje no existe',
            ];
            return response()->json($data);
        } else {
            $empresa = Empresa::find($mensaje->empresa_id);
            if ($user instanceof Empresa) {
                $empresaLogin = Empresa::find($user->getKey());
            } else {
                if ($user instanceof Empleado) {
                    $empresaLogin = Empresa::find($user->empresa_id);
                } else {
                    $data = [
                        'message' => 'Error. ',
                    ];
                    return response()->json($data);
                }
            }
            if ($empresa->id != $empresaLogin->id) {
                $data = [
                    'message' => 'No estás autorizado. El mensaje no es de tu empresa.',
                ];
                return response()->json($data);
            } else {
                if ($user instanceof Empleado) {
                    $empleado = Empleado::find($user->getKey());
                    if ($empleado->id == $mensaje->emisor || $empleado->id == $mensaje->receptor) {
                        $data = [
                            'mensaje' => $mensaje,
                            'empleado' => $empleado,
                            'empresa' => $empresa,
                        ];
                        return response()->json($data);
                    } else {
                        if ($empleado->tipoEmpleado == "Administrador") {
                            $data = [
                                'mensaje' => $mensaje,
                                'empleado' => $empleado,
                                'empresa' => $empresa,
                            ];
                            return response()->json($data);
                        } else {
                            $data = [
                                'message' => 'No estás autorizado. El mensaje no es tuyo.',
                            ];
                            return response()->json($data);
                        }
                    }
                }
                $data = [
                    'mensaje' => $mensaje,
                    'empresa' => $empresa,
                ];
                return response()->json($data);
            }
        }
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
            if ($user->cif || $user->tipoEmpleado === 'Administrador') {  //Compruebo que el usuario registrado es una empresa.
                if ($user->cif) {
                    $empresa = Empresa::find($user->id);
                } else {
                    $empresa = Empresa::find($user->empresa_id);
                }

                if ($empleado->empresa_id === $empresa->id) {
                    $mensajes = Mensaje::where('casos_id', $casoId)->get();
                    if (count($mensajes) != 0) {
                        $primerMensaje = $mensajes->first();
                        $empleadoEmisor = Empleado::find($primerMensaje->emisor);
                        $empleadoReceptor = Empleado::find($primerMensaje->receptor);
                        $response = [
                            'idEmisor' => $empleadoEmisor->id,
                            'Emisor' => $empleadoEmisor->nombre . "  " . $empleadoEmisor->apellidos,
                            'idReceptor' => $empleadoReceptor->id,
                            'Receptor' => $empleadoReceptor->nombre . "  " . $empleadoReceptor->apellidos,
                        ];
                        return response()->json(
                            ['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]
                        );
//                        $data = [
//                            'message' => 'Mensajes del caso ' . $caso->id,
//                            'id' => $caso->id,
//                            'asunto' => $caso->asunto,
//                            'mensajes' => $mensajes
//                        ];
                    } else {
                        $empleadoEmisor = Empleado::find($caso->empleado_id);
                        $response = [
                            'idEmisor' => $empleadoEmisor->id,
                            'Emisor' => $empleadoEmisor->nombre . "  " . $empleadoEmisor->apellidos,
                        ];
                        return response()->json(
                            ['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]
                        );
//                        $data = [
//                            'message' => 'El caso no tiene mensajes.',
//                            'id' => $caso->id,
//                            'asunto' => $caso->asunto,
//                        ];
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
                        $primerMensaje = $mensajes->first();
                        $empleadoEmisor = Empleado::find($primerMensaje->emisor);
                        $empleadoReceptor = Empleado::find($primerMensaje->receptor);
                        $response = [
                            'idEmisor' => $empleadoEmisor->id,
                            'Emisor' => $empleadoEmisor->nombre . "  " . $empleadoEmisor->apellidos,
                            'idReceptor' => $empleadoReceptor->id,
                            'Receptor' => $empleadoReceptor->nombre . "  " . $empleadoReceptor->apellidos,
                        ];
                        return response()->json(
                            ['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]
                        );
//                        $data = [
//                            'message' => 'Mensajes del caso ' . $caso->id,
//                            'id' => $caso->id,
//                            'asunto' => $caso->asunto,
//                            'mensajes' => $mensajes
//                        ];
                    } else {
                        $data = [
                            'message' => 'No estás autorizado.',
                        ];
                    }
                } else {
                    if ($caso->empleado_id == $user->id) {
                        $empleadoEmisor = Empleado::find($caso->empleado_id);
                        $response = [
                            'idEmisor' => $empleadoEmisor->id,
                            'Emisor' => $empleadoEmisor->nombre . "  " . $empleadoEmisor->apellidos,
                            'user_id' => $user->id,
                        ];
                        return response()->json(
                            ['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]
                        );
//                    $data = [
//                        'message' => 'El caso no tiene mensajes.',
//                        'id' => $caso->id,
//                        'asunto' => $caso->asunto,
//                    ];
                    } else {
                        $data = [
                            'message' => 'No estás autorizado.',
                        ];
                    }
                }
            }
        }
        return response()->json($data);
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
            'emisor' => 'required|exists:empleados,id',
            'receptor' => 'required|exists:empleados,id',
            'mensaje' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error, hay campos con errores de validación',
                'errores' => $validator->errors()->all()
            ];
        }

        //if ($user->id == $request['empleado_id']) {
        $caso = Caso::find($request['casos_id']);
        $empleadoOK = $user->id == $caso->empleado_id;

        $empresaOK = $user->empresa_id == $request['empresa_id'];
        $emisorOK = $user->id == $request['emisor'];
        $receptorOK = Empleado::find($request['receptor']);
        if ($receptorOK) {
            $receptorOK = $user->empresa_id == $receptorOK->empresa_id;
        }
        // ¿discutir si solo se pueden enviar mensajes al admin?
        $esAdmin = $user->tipoEmpleado == "Administrador";

        if ($empleadoOK && $empresaOK && $emisorOK && $receptorOK) {
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
        } else {
            $data = [
                'message' => 'No estás autorizado.',
            ];
        }
        return response()->json($data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $mensajeId)
    {
        $user = Auth::user();
        $mensaje = Mensaje::find($mensajeId);

        $validator = Validator::make($request->all(), [
            'receptor' => 'required|integer',
            'mensaje' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error, hay campos con errores de validación',
                'errores' => $validator->errors()->all()
            ];
        }

        /*
         * Solo se puede modificar el último mensaje
         * Si eres el emisor (es un empleado)
         * El $mensajeId == $ultimoMensaje
         *
         */
        if ($mensaje) {
            if ($mensajeId == Mensaje::where('casos_id', $mensaje->casos_id)
                    ->orderBy('id', 'desc')
                    ->first()->id) // es el último mensaje.
            {
                if ($user->nif && $user->id == $mensaje->emisor) { //si es empleado y el emisor del mensaje coincide con el id del usuario logueado.
                    $mensaje->receptor = $request->receptor;
                    $mensaje->mensaje = $request->mensaje;
                    $mensaje->horaEnvio = Carbon::now();
                    $mensaje->save();
                    $data = [
                        'message' => 'Mensaje actualizado correctamente',
                        'mensaje' => $mensaje
                    ];
                } else {
                    $data = [
                        'message' => 'No se puede modificar, no estás autorizado',
                    ];
                }
            } else {
                $data = [
                    'message' => 'No se puede modificar, no es el último mensaje',
                ];
            }
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
    public function destroy($mensajeId)
    {
        $user = Auth::user();
        $mensaje = Mensaje::find($mensajeId);
        if ($mensaje) {
            if ($mensajeId == Mensaje::where('casos_id', $mensaje->casos_id)
                    ->orderBy('id', 'desc')
                    ->first()->id) // es el último mensaje.
            {
                if ($user->nif && $user->id == $mensaje->emisor) {
                    $mensaje->delete();
                    $data = [
                        'message' => 'Mensaje eliminado correctamente',
                        'mensaje' => $mensaje
                    ];
                } else {
                    $data = [
                        'message' => 'No se puede eliminar, no estás autorizado',
                    ];
                }
            } else {
                $data = [
                    'message' => 'No se puede eliminar, no es el último mensaje',
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
