<?php

namespace App\Http\Controllers;

use App\Helpers\Auxiliares;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/**
 *
 */
class EmpleadoController extends Controller {
    /**
     * Display a listing of the resource.
     * Función que devuelve todos los empleados del usuario logueado como empresa.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        if ($user instanceof Empresa) {
            $empleados = Empleado::where('empresa_id', $user->getKey())->get();
            return response()->json($empleados);
        } else {
            if ($user instanceof Empleado) {
                $empleado = Empleado::find($user->getKey());
                if ($empleado->tipoEmpleado == "Administrador") {
                    $empleados = Empleado::where('empresa_id', $empleado->empresa_id)->get();
                    return response()->json($empleados);
                } else {
                    if ($empleado->tipoEmpleado == "Trabajador") {
                        $empleado = $empleado->makeHidden(['password']);
                        return response()->json($empleado);
                    } else {
                        $data = ['message' => 'Error'];
                        return response()->json($data);
                    }
                }
            } else {
                $data = ['message' => 'No autorizado'];
                return response()->json($data);
            }
        }
    }


    /**
     * Display the specified resource.
     * Función que muestra los datos del empleado logueado.
     * @param \App\Models\empleado $empleado
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($empleadoId)
    {
        $user = Auth::user();
        $empleado = Empleado::find($empleadoId);
        if (!$empleado) {
            $data = [
                'message' => 'El empleado no existe',
            ];
            return response()->json($data);
        } else {
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
            if (Empresa::find($empleado->empresa_id)->id != $empresaLogin->id) {
                $data = [
                    'message' => 'No estás autorizado. El empleado no es de tu empresa.',
                ];
                return response()->json($data);
            } else {
                if ($user instanceof Empleado) {
                    $empleadoLogin = Empleado::find($user->getKey());
                    if ($empleadoLogin->tipoEmpleado == "Administrador" || $empleadoLogin->id == $empleado->id) {
                        return response()->json($empleado);
                    } else {
                        $data = [
                            'message' => 'No estás autorizado.',
                        ];
                        return response()->json($data);
                    }
                }
                return response()->json($empleado);
            }
        }
    }

    /**
     * Función que guarda un empleado en la base de datos
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nif' => 'required|string|unique:empleados',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'direccion' => 'required|string',
            'cPostal' => 'required|string|digits:5',
            'poblacion' => 'required|string',
            'provincia' => 'required|string',
            'pais' => 'required|string',
            'telefono' => 'required|integer|digits:9|unique:empleados',
            'fechaNacimiento' => 'required|date',
            'email' => 'required|string|email|max:255|unique:empleados',
            'password' => 'required|confirmed|string|min:8',
            'numSegSoc' => 'required|digits:12|unique:empleados',
            'fotografia' => 'string',
            'ultimaConexion' => 'required|date_format:Y-m-d H:i:s',
            'activo' => 'required|boolean',
            'tipoEmpleado' => Rule::in(['Administrador', 'Trabajador']),
            'fechaAlta' => 'required|date',
            'fechaBaja' => 'date'
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error, hay campos con errores de validación',
                'errores' => $validator->errors()->all()
            ];
        }
        $empleado = new Empleado();
        $empleado->empresa_id = $request['empresa_id'];
        $empleado->nif = $request['nif'];
        $empleado->nombre = $request['nombre'];
        $empleado->apellidos = $request['apellidos'];
        $empleado->direccion = $request['direccion'];
        $empleado->cPostal = $request['cPostal'];
        $empleado->poblacion = $request['poblacion'];
        $empleado->provincia = $request['provincia'];
        $empleado->pais = $request['pais'];
        $empleado->telefono = $request['telefono'];
        $empleado->fechaNacimiento = $request['fechaNacimiento'];
        $empleado->email = $request['email'];
        $empleado->password = Hash::make($request['password']);
        $empleado->numSegSoc = $request['numSegSoc'];
        $empleado->fotografia = $request['fotografia'];
        $empleado->ultimaConexion = $request['ultimaConexion'];
        $empleado->activo = $request['activo'];
        $empleado->tipoEmpleado = $request['tipoEmpleado'];
        $empleado->fechaAlta = $request['fechaAlta'];
        $empleado->fechaBaja = $request['fechaBaja'];

        $empleado->save();

        $token = $empleado->createToken('auth_token')->plainTextToken;

        $data = [
            'message' => 'Empleado creado correctamente',
            'empleado' => $empleado,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ];
        return response()->json($data);
    }

    /**
     * Función que actualiza el empleado.
     * @param Request $request
     * @param $id
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $empleado = Empleado::find($id);

        if ($empleado) {
            $validator = Validator::make($request->all(), [
                'nif' => [
                    'required',
                    'string',
                    Rule::unique('empleados')->ignore($empleado->id),
                ],
                'nombre' => 'required|string',
                'apellidos' => 'required|string',
                'direccion' => 'required|string',
                'cPostal' => 'required|string|digits:5',
                'poblacion' => 'required|string',
                'provincia' => 'required|string',
                'pais' => 'required|string',
                'telefono' => [
                    'required',
                    'integer',
                    'digits:9',
                    Rule::unique('empleados')->ignore($empleado->id),
                ],
                'fechaNacimiento' => 'required|date',
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique('empleados')->ignore($empleado->id),
                ],
                'numSegSoc' => [
                    'required',
                    'digits:12',
                    Rule::unique('empleados')->ignore($empleado->id),
                ],
                'fotografia' => 'string',
                'ultimaConexion' => 'required|date_format:Y-m-d H:i:s',
                'activo' => 'required|boolean',
                'tipoEmpleado' => Rule::in(['Administrador', 'Trabajador']),
                'fechaAlta' => 'required|date',
                'fechaBaja' => 'date'
            ]);

            if ($validator->fails()) {
                return [
                    'message' => 'Error, hay campos con errores de validación',
                    'errores' => $validator->errors()->all()
                ];
            }

            $empleado->nif = $request->nif;
            $empleado->nombre = $request->nombre;
            $empleado->apellidos = $request->apellidos;
            $empleado->direccion = $request->direccion;
            $empleado->cPostal = $request->cPostal;
            $empleado->poblacion = $request->poblacion;
            $empleado->provincia = $request->provincia;
            $empleado->pais = $request->pais;
            $empleado->telefono = $request->telefono;
            $empleado->fechaNacimiento = $request->fechaNacimiento;
            $empleado->email = $request->email;
            $empleado->numSegSoc = $request->numSegSoc;
            $empleado->fotografia = $request->fotografia;
            $empleado->ultimaConexion = $request->ultimaConexion;
            $empleado->activo = $request->activo;
            $empleado->fechaAlta = $request->fechaAlta;
            $empleado->fechaBaja = $request->fechaBaja;
            $empleado->tipoEmpleado = $request->tipoEmpleado;

            $empleado->save();
            $data = [
                'message' => 'Empleado actualizado correctamente',
                'empleado' => $empleado
            ];
        } else {
            $data = [
                'message' => 'Empleado no existe'
            ];
        }
        return response()->json($data);
    }


    /**
     * Función que elimina un empleado.
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($empleadoId)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);

        if (is_numeric($empresaId)) {
            $empleado = Empleado::find($empleadoId);

            if ($empleado) {
                try {
                    $empleado->delete();
                    $data = [
                        'user' => $user,
                        'message' => 'Empleado eliminado correctamente',
                        'empleado' => $empleado
                    ];
                } catch (QueryException $e) {
                    if (str_contains($e->getMessage(), 'Integrity constraint violation')) {
                        $data = [
                            'message' => 'No se puede eliminar el empleado debido a que tiene registros relacionados en otras tablas.'
                        ];
                    } else {
                        // Si la excepción no se debe a una violación de integridad referencial,
                        // propagamos la excepción para que se maneje en otro lugar.
                        throw $e;
                    }
                }
            } else {
                $data = [
                    'message' => 'Empleado no existe'
                ];
            }
        } else {
            $data = ['message' => $empresaId['message'],];
        }
        return response()->json($data);
    }

    /**
     * Función iniciar sesión.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $empleado = Empleado::where('email', $request->email)->first();
        if ($empleado) {
            if (Hash::check($request->password, $empleado->password)) {
                if ($empleado->tipoEmpleado === 'Administrador') {
                    $sinTurnoActivo = Auxiliares::obtenerEmpleadosSinTurnoActivo($empleado->empresa_id);
                    $turnoCaducado = Auxiliares::obtenerEmpleadosTurnoCaducado($empleado->empresa_id);
                } else {
                    $sinTurnoActivo = [];
                    $turnoCaducado = [];
                }
                $token = $empleado->createToken('auth_token')->plainTextToken;
                return response()->json([
                    "mensaje" => "Usuario logueado correctamente",
                    "token_type" => 'Bearer',
                    'token' => $token,
                    'empleado' => $empleado->id,
                    'empresa' => $empleado->empresa_id,
                    'tipo_empleado' => $empleado->tipoEmpleado,
                    'empleadosSinTurnoActivo' => $sinTurnoActivo,
                    'turnoCaducado' => $turnoCaducado,
                ]);
            } else {
                return response()->json([
                    'message' => "Datos incorrectos",
                    'errores' => "Datos incorrectos"
                ], 201);
            }
        } else {
            return response()->json([
                'message' => "Datos incorrectos",
                'errores' => "Datos incorrectos"
            ], 201);
        }
    }

    /**
     * Función que cierra la sesión.
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            $user = auth()->user();

            if ($user) {
                if ($user instanceof Empleado) {
                    // Cerrar sesión de un Empleado
                    $user->tokens()->delete();
                    return response()->json(["message" => "Sesión de Empleado cerrada"]);
                } else {
                    // No cerrar sesión de una Empresa
                    return response()->json(["message" => "No tienes permiso para cerrar esta sesión"], 403);
                }
            } else {
                return response()->json(["message" => "Usuario no autenticado"], 401);
            }
        } catch (\Exception $e) {
            // Captura y maneja cualquier excepción que ocurra durante la ejecución
            // del código en el bloque try
            return response()->json(["message" => "Error al cerrar la sesión"], 500);
        }
    }

    public function modificarTurnoAEmpleado(Request $request, $empleadoId)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $empleado = Empleado::find($empleadoId);
            if ($empleado && $empleado->empresa_id === $empresaId) {
                $turno = DB::table('empleados_turnos')
                    ->where('id', $request->empleados_turnos_id)
                    ->first();
                if ($turno->empleado_id === $empleado->id) {
                    if ($request->turno_id === $turno->turno_id &&
                        $request->fechaInicioTurno === $turno->fechaInicioTurno &&
                        $request->fechaFinTurno >= date("Y-m-d")) {
                        $empleado->turnos()->updateExistingPivot($request->turno_id, [
                            'fechaInicioTurno' => $request->fechaInicioTurno,
                            'fechaFinTurno' => $request->fechaFinTurno,
                            'activo' => true
                        ]);
                        // Obtener el turno modificado
                        $turnoModificado = $empleado->turnos->where('pivot.id', $request->empleados_turnos_id)->first();
                        $data = [
                            'message' => 'Turno actualizado correctamente.',
                            'turnoModificado' => $turnoModificado,
                        ];
                        return response()->json($data);
                    } else {
                        $data = ['message' => 'Errores de validación.',];
                        return response()->json($data);
                    }
                } else {
                    $data = ['message' => 'Error. Turno no corresponde al empleado',];
                    return response()->json($data);
                }
            } else {
                $data = ['message' => 'El empleado no existe.',];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data);
        }
    }

    public function asignarTurnoAEmpleado(Request $request)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            if ($request->fechaInicioTurno < $request->fechaFinTurno) {
                $nuevoTurno = Turno::find($request->turno_id);
                if ($nuevoTurno && $nuevoTurno->empresa_id === $empresaId) {
                    $empleado = Empleado::find($request->empleado_id);
                    if ($empleado) {
                        $empleado->turnos->where('pivot.activo', true)->first();
                        $turnoActivo = $empleado->turnos->where('pivot.activo', 1)->first();
                        if (!$turnoActivo || count($empleado->turnos) === 0) {
                            // El empleado tiene turno no activo o no tiene turno asignado.
                            if (count($empleado->turnos) === 0) {
                                return Auxiliares::asignarTurno($request, $empleado);
                            } else {
                                return Auxiliares::validarFechaInicioYAsignarTurno($request, $empleado);
                            }
                        } else { // El empleado tiene turno asignado.
                            return Auxiliares::validarFechaInicioYAsignarTurno($request, $empleado, $turnoActivo);
                        }
                    } else {
                        $data = ['message' => 'El empleado no existe.',];
                        return response()->json($data);
                    }
                } else {
                    $data = ['message' => 'Turno no existe.',];
                    return response()->json($data);
                }
            } else {
                $data = ['message' => 'La fecha de fin de turno tiene que ser mayor que la fecha de inicio de turno',];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data);
        }
    }

    public function turnoActivoEmpleado($empleadoId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);
        if ($loginOk === true) {
            $empleado = Empleado::find($empleadoId);
            if ($empleado) {
                if ($user instanceof Empresa) {
                    if ($user->getKey() != $empleado->empresa_id) {
                        $data = ['message' => 'El empleado con el ID proporcionado no pertenece a la empresa'];
                        return response()->json($data);
                    }
                } else {
                    if ($user instanceof Empleado) {
                        if ($user->empresa_id != $empleado->empresa_id) {
                            $data = ['message' => 'La empresa del empleado proporcionado no coincide con la empresa del usuario autenticado.'];
                            return response()->json($data);
                        }
                        if ($user->tipoEmpleado != "Administrador" && $user->getKey() != $empleadoId) {
                            $data = ['message' => 'No estás autorizado.'];
                            return response()->json($data);
                        }
                    }
                }
                $turnoActivo = $empleado->turnos->where('pivot.activo', true)->first();
                if ($turnoActivo) {
                    $turnos = Turno::with('dias')->find($turnoActivo->id);
                    $data = [
                        'message' => 'Turno activo del empleado ' . $empleado->id . " " . $empleado->nombre,
                        'empleado_id' => $empleadoId,
                        'turnoId' => $turnoActivo->id,
                        'descripcion' => $turnos->descripcion,
                        'FechaInicioTurno' => $turnoActivo->pivot->fechaInicioTurno,
                        'FechaFinTurno' => $turnoActivo->pivot->fechaFinTurno,
                        'dias' => $turnos->dias,
                    ];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'No se encontró turno activo para el empleado'];
                    return response()->json($data);
                }
            } else {
                $data = ['message' => 'No se encontró el empleado con el ID proporcionado'];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $loginOk['message'],];
            return response()->json($data);
        }
    }

    public function todosLosTurnos($empleadoId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);
        if ($loginOk === true) {
            $empleado = Empleado::find($empleadoId);
            if ($empleado) {
                if ($user instanceof Empresa) {
                    if ($user->getKey() != $empleado->empresa_id) {
                        $data = ['message' => 'El empleado con el ID proporcionado no pertenece a la empresa'];
                        return response()->json($data);
                    }
                } else {
                    if ($user instanceof Empleado) {
                        if ($user->empresa_id != $empleado->empresa_id) {
                            $data = ['message' => 'La empresa del empleado proporcionado no coincide con la empresa del usuario autenticado.'];
                            return response()->json($data);
                        }
                        if ($user->tipoEmpleado != "Administrador" && $user->getKey() != $empleadoId) {
                            $data = ['message' => 'No estás autorizado.'];
                            return response()->json($data);
                        }
                    }
                }

                $turnoEmpleado = DB::table('empleados_turnos')
                    ->join('empleados', 'empleados_turnos.empleado_id', '=', 'empleados.id')
                    ->join('turnos', 'empleados_turnos.turno_id', '=', 'turnos.id')
                    ->select('empleados_turnos.*', 'empleados.nombre', 'empleados.apellidos', 'turnos.descripcion')
                    ->where('empleados_turnos.empleado_id', $empleadoId)
                    ->get();

                $turnoEmpleado = collect($turnoEmpleado)->map(function ($item) {
                    return collect($item)->only([
                        'id',
                        'empleado_id',
                        'turno_id',
                        'fechaInicioTurno',
                        'fechaFinTurno',
                        'activo',
                        'nombre',
                        'apellidos',
                        'descripcion'
                    ]);
                })->all();
                if ($turnoEmpleado) {
                    $data = [
                        'message' => 'Todo los turnos del empleado',
                        'turnoSEmpleado' => $turnoEmpleado,
                    ];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'No se encontró turno activo para el empleado'];
                    return response()->json($data);
                }
            } else {
                $data = ['message' => 'No se encontró el empleado con el ID proporcionado'];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $loginOk['message'],];
            return response()->json($data);
        }
    }

    public function turnoEmpleado($turnoEmpleadoId)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $empleado = Empleado::join('empleados_turnos', 'empleados.id', '=', 'empleados_turnos.empleado_id')
                ->where('empleados_turnos.id', $turnoEmpleadoId)
                ->select('empleados.*')
                ->first();

            if ($empleado && $empleado->empresa_id === $empresaId) {
                $turnoEmpleado = DB::table('empleados_turnos')
                    ->join('empleados', 'empleados_turnos.empleado_id', '=', 'empleados.id')
                    ->join('turnos', 'empleados_turnos.turno_id', '=', 'turnos.id')
                    ->select('empleados_turnos.*', 'empleados.nombre', 'empleados.apellidos', 'turnos.descripcion')
                    ->where('empleados_turnos.id', $turnoEmpleadoId)
                    ->where('empleados.empresa_id', $empresaId)
                    ->first();
                $turnoEmpleado->fechaInicioTurno = Carbon::parse($turnoEmpleado->fechaInicioTurno)->format('d-m-Y');
                $turnoEmpleado->fechaFinTurno = Carbon::parse($turnoEmpleado->fechaFinTurno)->format('d-m-Y');
                $turnoEmpleado = collect($turnoEmpleado)->except(['created_at', 'updated_at']);
                $data = ['turnoEmpleado' => $turnoEmpleado];
                return response()->json($data);
            } else {
                $data = ['message' => 'El turno no corresponde a la empresa.',];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data);
        }
    }
}
