<?php

namespace App\Http\Controllers;

use App\Helpers\Auxiliares;
use App\Models\Caso;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Mensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CasoController extends Controller {

    /**
     * Display the specified resource.
     */
    public function show($casoId)
    {
        $user = Auth::user();
        $empresa = $this->getEmpresa($user);
        $caso = Caso::find($casoId);
        if (!$caso) {
            return response()->json(['message' => 'Caso no encontrado']);
        }
        if ($user->cif || $user->tipoEmpleado === 'Administrador') {
            $empleado = Empleado::find($caso->empleado_id);
            if ($empleado->empresa_id !== $empresa->id) {
                return response()->json(['error' => 'El caso no pertenece a la empresa especificada']);
            }
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
                return response()->json(['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]);
            } else {
                $empleadoEmisor = Empleado::find($caso->empleado_id);
                $response = [
                    'idEmisor' => $empleadoEmisor->id,
                    'Emisor' => $empleadoEmisor->nombre . "  " . $empleadoEmisor->apellidos,
                ];
                return response()->json(['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]);
            }
        } else {
            $mensajes = Mensaje::where('casos_id', $casoId)->get();
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
                return response()->json(['caso' => $caso, 'Intervinientes' => $response, 'mensajes' => $mensajes]);
            } else {
                return response()->json(['message' => 'no estás autorizado']);
            }
        }
    }

    public function getEmpresa($user): Empresa
    {
        if ($user->cif) {
            $empresa = Empresa::find($user->id);
        } else {
            $empresa = Empresa::find($user->empresa_id);
        }
        return $empresa;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $empresa = $this->getEmpresa($user);
        if ($user->cif || $user->tipoEmpleado === 'Administrador') {  //Compruebo que el usuario logueado es una empresa.

            $casos = Caso::whereIn('empleado_id', $empresa->empleados->pluck('id'))
                ->with([
                    'empleado' => function ($query) {
                        $query->select('id', 'nombre', 'apellidos');
                    }
                ])
                ->select('id', 'empleado_id', 'asunto', 'activo', 'fechaCreacion')
                ->get();

            $data = $this->getArr($casos, $empresa);
        } else {
            $casos = Caso::where('empleado_id', $user->id)
                ->with([
                    'empleado' => function ($query) {
                        $query->select('id', 'nombre', 'apellidos');
                    }
                ])
                ->select('id', 'empleado_id', 'asunto', 'activo', 'fechaCreacion')
                ->get();

            $data = $this->getArr($casos, $empresa);
        }
        return response()->json($data);
    }

    /**
     * @param $casos
     * @param $empresa
     * @return array|string[]
     */
    public function getArr($casos, $empresa): array
    {
        $casos->each(function ($caso) use ($empresa) {
            $caso->empresa_id = $empresa->id;
            $caso->nombre_empresa = $empresa->nombreComercial;
        });

        if (count($casos) != 0) {
            $data = [
                'message' => 'Casos de la empresa ' . $empresa->id,
                'casos' => $casos,
            ];
        } else {
            $data = [
                'message' => 'La empresa no tiene casos ',
            ];
        }
        return $data;
    }

    public function casosDeUnEmpleado($empleadoId)
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);

        if ($loginOk === true) {
            $casos = Caso::whereIn('casos.id', function ($query) use ($empleadoId) {
                $query->select('casos_id')
                    ->from('mensajes')
                    ->where(function ($query) use ($empleadoId) {
                        $query->where('emisor', $empleadoId)
                            ->orWhere('receptor', $empleadoId);
                    });
            })
                ->orWhere(function ($query) use ($empleadoId) {
                    $query->whereNotExists(function ($query) use ($empleadoId) {
                        $query->select('casos_id')
                            ->from('mensajes')
                            ->whereColumn('casos.id', '=', 'mensajes.casos_id')
                            ->where(function ($query) use ($empleadoId) {
                                $query->where('emisor', $empleadoId)
                                    ->orWhere('receptor', $empleadoId);
                            });
                    });
                    $query->where('casos.empleado_id', $empleadoId);
                })
                ->join('empleados', 'casos.empleado_id', '=', 'empleados.id')
                ->select('casos.*', 'empleados.nombre', 'empleados.apellidos')
                ->get();
//            $empleado = Empleado::find($empleadoId);
//            $casos = Caso::whereIn('id', function ($query) use ($empleadoId) {
//                $query->select('casos_id')
//                    ->from('mensajes')
//                    ->where(function ($query) use ($empleadoId) {
//                        $query->where('emisor', $empleadoId)
//                            ->orWhere('receptor', $empleadoId);
//                    });
//            })
//                ->orWhere(function ($query) use ($empleadoId) {
//                    $query->whereNotExists(function ($query) use ($empleadoId) {
//                        $query->select('casos_id')
//                            ->from('mensajes')
//                            ->where('casos.id', '=', 'mensajes.casos_id')
//                            ->where(function ($query) use ($empleadoId) {
//                                $query->where('emisor', $empleadoId)
//                                    ->orWhere('receptor', $empleadoId);
//                            });
//                    });
//                    $query->where('empleado_id', $empleadoId);
//                })
//                ->get();
//
//            foreach ($casos as $caso) {
//                $caso->nombre = $empleado->nombre;
//                $caso->apellidos = $empleado->apellidos;
//            }
            if (count($casos) > 0) {
                $data = [
                    'message' => 'Todos los casos en los que participa el empleado ' . $empleadoId,
                    'casos' => $casos,
                ];
                return response()->json($data);
            } else {
                $data = ['message' => 'El empleado ' . $empleadoId . ' no tiene casos.',];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $loginOk['message'],];
            return response()->json($data);
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
        $user = Auth::user();
        if (!($user instanceof Empresa)) {
            // Validación de los datos del formulario
            $validator = Validator::make($request->all(), [
                'empleado_id' => 'required|exists:empleados,id',
                // Validación de existencia del empleado_id en la tabla empleados
                'asunto' => 'required|string',
                'activo' => 'boolean',
                'fechaCreacion' => 'nullable|date'
            ]);

            if ($validator->fails()) {
                return [
                    'message' => 'Error, hay campos con errores de validación',
                    'errores' => $validator->errors()->all()
                ];
            }
            if ($user->id == $request['empleado_id']) {
                // Creación del nuevo caso en la base de datos
                $caso = new Caso();
                $caso->empleado_id = $request['empleado_id'];
                $caso->asunto = $request['asunto'];
                $caso->activo = $request->has(
                    'activo'
                ) ? $request['activo'] : true; // Si no se proporciona el valor de activo, se establece como true por defecto
                $caso->fechaCreacion = Carbon::now();
                $caso->save();
                $empleado = Empleado::find($caso->empleado_id);
                $data = [
                    'message' => 'Caso creado correctamente',
                    'caso' => $caso,
                    'empresa_id' => $empleado->empresa_id,
                ];
            } else {
                $data = [
                    'message' => 'El ID del empleado no coincide con el usuario autenticado.',
                ];
            }
        } else {
            $data = [
                'message' => 'Un caso solo puede crearlo un Empleado.',
            ];
        }

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Caso $caso)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $casoId)
    {
        $user = Auth::user();
        if (!($user instanceof Empresa)) {
            $caso = Caso::find($casoId);

            if ($caso) {
                $validator = Validator::make($request->all(), [
                    'asunto' => 'required|string',
                    'activo' => 'required|boolean'
                ]);

                if ($validator->fails()) {
                    return [
                        'message' => 'Error, hay campos con errores de validación',
                        'errores' => $validator->errors()->all()
                    ];
                }
                /*
                 * Un caso puede modificarlo el empleado que lo creo ($caso->empleado_id) o un administrador de la empresa.
                 * Hay que comprobar que el usuario logueado sea de tipo empleado.
                 */
                if ($user->nif) {
                    $esPropietario = $user->id == $caso->empleado->id;
                    $esAdmin = $user->tipoEmpleado == "Administrador" && $user->empresa_id == $caso->empleado->empresa_id;

                    if ($esPropietario || $esAdmin) {
                        $caso->asunto = $request['asunto'];
                        $caso->activo = $request['activo'];
                        $caso->save();
                        $data = [
                            'message' => 'Caso actualizado correctamente',
                            'id empleado que actualiza' => $user->id,
                            'tipo empleado que actualiza' => $user->tipoEmpleado,
                            'caso' => $caso,
                        ];
                    } else {
                        $data = [
                            'message' => 'No estás autorizado.',
                        ];
                    }
                } else {
                    $data = [
                        'message' => 'No estás autorizado.',
                    ];
                }
            } else {
                $data = [
                    'message' => 'Caso no existe'
                ];
            }
        } else {
            $data = [
                'message' => 'No estás autorizo. Los casos son los pueden modificar los Empleados'
            ];
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($casoId)
    {
        $user = Auth::user();
        if (!($user instanceof Empresa)) {
            $caso = Caso::find($casoId);
            /* Para borrar un caso:
                1.- Tiene que existir.
                2.- Lo puede borrar el propietario o un admin de la empresa.
                3.- Si tiene mensajes no se puede borrar. (el id del caso está en la tabla mensajes).
            */

            if ($caso) {
                $esPropitario = $user->id == $caso->empleado->id;
                $esAdmin = $user->tipoEmpleado == "Administrador";
                $mensajes = Mensaje::where('casos_id', $casoId)->get();
                if (count($mensajes) != 0) {
                    $data = [
                        'message' => 'Error, no se puede borrar, el caso tiene mensajes.',
                    ];
                } else {
                    if ($esPropitario || $esAdmin) {
                        $caso->delete();
                        $data = [
                            'message' => 'Caso eliminado correctamente',
                            'caso' => $caso,
                        ];
                    } else {
                        $data = [
                            'message' => 'Error, no estás autorizado.',
                        ];
                    }
                }
            } else {
                $data = [
                    'message' => 'Caso no existe'
                ];
            }
        } else {
            $data = [
                'message' => 'Un caso solo puede eliminarlo un Empleado.'
            ];
        }
        return response()->json($data);
    }
}
