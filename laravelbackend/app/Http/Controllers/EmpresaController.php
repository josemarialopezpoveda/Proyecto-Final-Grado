<?php

namespace App\Http\Controllers;


use App\Models\Empleado;
use App\Models\Empresa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/**
 *
 */
class EmpresaController extends Controller {


    /**
     * Función que devuelve todas las empresas.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        //$empresas = Empresa::with('empleados')->get();
        $empresas = Empresa::select('nombreComercial', 'pais', 'poblacion', 'provincia')->get();
        return response()->json($empresas);
    }

    /**
     * Función que muestra la empresa del usuario logueado
     * @return JsonResponse
     */
    public function show($empresaId)
    {
        $user = Auth::user();
        if ($user instanceof Empresa) {
            if ($user->id == $empresaId) {
                $empresa = Empresa::with('empleados')->find($empresaId);
                return response()->json($empresa);
            } else {
                $data = ['error' => 'No estás autorizado.'];
                return response()->json($data, 401);
            }
        } elseif ($user instanceof Empleado) {
            if ($user->tipoEmpleado == "Administrador") {
                if ($user->empresa_id == $empresaId) {
                    $empresa = Empresa::with('empleados')->find($empresaId);
                    return response()->json($empresa);
                } else {
                    $data = ['error' => 'No estás autorizado.'];
                    return response()->json($data, 401);
                }
            } elseif ($user->tipoEmpleado == "Trabajador") {
                $data = ['error' => 'No estás autorizado.'];
                return response()->json($data, 401);
            } else {
                $data = ['error' => 'Error no controlado.'];
                return response()->json($data, 400);
            }
        } else {
            $data = ['error' => 'Error no controlado.'];
            return response()->json($data, 400);
        }
    }

    public function empresaEmpleados($empresaId): JsonResponse
    {
        $user = Auth::user();
        if ($user instanceof Empresa) {
            if ($user->getKey() == $empresaId) {
                return $this->extracted($empresaId);
            } else {
                $data = ['error' => 'No estás autorizado.'];
                return response()->json($data, 401);
            }
        } elseif ($user instanceof Empleado) {
            if ($user->empresa_id == $empresaId) {
                return $this->extracted($empresaId);
            } else {
                $data = ['error' => 'No estás autorizado.'];
                return response()->json($data, 401);
            }
        } else {
            $data = ['message' => 'Error no controlado.'];
            return response()->json($data, 400);
        }
    }

    /**
     * @param $empresaId
     * @return JsonResponse
     */
    public function extracted($empresaId): JsonResponse
    {
        $empresa = Empresa::with('empleados')->find($empresaId);
        if ($empresa) {
            $empleados = $empresa->empleados->map(function ($empleado) {
                return [
                    'id' => $empleado->id,
                    'empleado' => $empleado->nombre . " " . $empleado->apellidos,
                ];
            });
            if (count($empleados) > 0) {
                return response()->json($empleados);
            } else {
                $data = ['error' => 'La empresa no tiene empleados.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['error' => 'Empresa no existe.'];
            return response()->json($data, 404);
        }
    }

    /**
     * Función que crea una empresa
     * @param Request $request
     * @return array|JsonResponse
     */
    public
    function store(
        Request $request
    ) {
        $validator = Validator::make($request->all(), [
            'cif' => 'required|string|unique:empresas',
            'razonSocial' => 'required|string',
            'nombreComercial' => 'required|string',
            'direccion' => 'required|string',
            'cPostal' => 'required|string|digits:5',
            'poblacion' => 'required|string',
            'provincia' => 'required|string',
            'pais' => 'required|string',
            'telefonoFijo' => 'required|integer|digits:9|unique:empresas',
            'telefonoMovil' => 'required|integer|digits:9|unique:empresas',
            'email' => 'required|string|email|max:255|unique:empresas',
            'password' => 'required|string|confirmed|min:8',
            'logotipo' => 'string',
            //'logotipo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // añadido logotipo
            'ultimaConexion' => 'required|date_format:Y-m-d H:i:s',
            'activo' => 'required|boolean',
            'fechaAlta' => 'required|date',
            'fechaBaja' => 'date'
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error, hay campos con errores de validación',
                'errores' => $validator->errors()->all()
            ];
        }
        $empresa = new Empresa();
        $empresa->cif = $request['cif'];
        $empresa->razonSocial = $request['razonSocial'];
        $empresa->nombreComercial = $request['nombreComercial'];
        $empresa->direccion = $request['direccion'];
        $empresa->cPostal = $request['cPostal'];
        $empresa->poblacion = $request['poblacion'];
        $empresa->provincia = $request['provincia'];
        $empresa->pais = $request['pais'];
        $empresa->telefonoFijo = $request['telefonoFijo'];
        $empresa->telefonoMovil = $request['telefonoMovil'];
        $empresa->email = $request['email'];
        $empresa->password = Hash::make($request['password']);
        //$empresa->logotipo = Storage::disk('public')->putFile('images', $request['logotipo']);
        $empresa->logotipo = $request['logotipo'];
        $empresa->ultimaConexion = $request['ultimaConexion'];
        $empresa->activo = $request['activo'];
        $empresa->fechaAlta = $request['fechaAlta'];
        $empresa->fechaBaja = $request['fechaBaja'];

        $empresa->save();

        $token = $empresa->createToken('auth_token')->plainTextToken;

        $data = [
            'message' => 'Empresa creado correctamente',
            'empresa' => $empresa->id,
            'token' => $token,
            'token_type' => 'Bearer',
        ];
        return response()->json($data);
    }

    /**
     *  Función que actualiza la empresa del usuario logueado
     * @param Request $request
     * @return array|JsonResponse
     */
    public
    function update(
        Request $request,
        $empresaId
    ) {
        $user = Auth::user();
        //$empresa = Empresa::with('empleados')->find(Auth::user()->id);
        $empresa = Empresa::find($empresaId);
        $validator = Validator::make($request->all(), [
            'cif' => [
                'required',
                'string',
                Rule::unique('empresas')->ignore($empresa->id),
            ],
            'razonSocial' => 'required|string',
            'nombreComercial' => 'required|string',
            'direccion' => 'required|string',
            'cPostal' => 'required|string|digits:5',
            'poblacion' => 'required|string',
            'provincia' => 'required|string',
            'pais' => 'required|string',
            'telefonoFijo' => [
                'required',
                'integer',
                'digits:9',
                Rule::unique('empresas')->ignore($empresa->id),
            ],
            'telefonoMovil' => [
                'required',
                'integer',
                'digits:9',
                Rule::unique('empresas')->ignore($empresa->id),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('empresas')->ignore($empresa->id),
            ],
            //'logotipo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // añadido logotipo
            'logotipo' => 'string',
            'ultimaConexion' => 'required|date_format:Y-m-d H:i:s',
            'activo' => 'required|boolean',
            'fechaAlta' => 'required|date',
            'fechaBaja' => 'date'
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error, hay campos con errores de validación',
                'errores' => $validator->errors()->all()
            ];
        }

        $empresa->cif = $request['cif'];
        $empresa->razonSocial = $request['razonSocial'];
        $empresa->nombreComercial = $request['nombreComercial'];
        $empresa->direccion = $request['direccion'];
        $empresa->cPostal = $request['cPostal'];
        $empresa->poblacion = $request['poblacion'];
        $empresa->provincia = $request['provincia'];
        $empresa->pais = $request['pais'];
        $empresa->telefonoFijo = $request['telefonoFijo'];
        $empresa->telefonoMovil = $request['telefonoMovil'];
        $empresa->email = $request['email'];
        $empresa->logotipo = $request['logotipo'];
        $empresa->ultimaConexion = $request['ultimaConexion'];
        $empresa->activo = $request['activo'];
        $empresa->fechaAlta = $request['fechaAlta'];
        $empresa->fechaBaja = $request['fechaBaja'];
        //$empresa->logotipo = Storage::disk('public')->putFile('images', $request['logotipo']);
        $empresa->logotipo = $request['logotipo'];

        $empresa->save();
        $data = [
            'message' => 'Empresa actualizada correctamente',
            'empresa' => $empresa
        ];
        return response()->json($data);
    }

    /**
     * Función que elimina la empresa del usuario logueado
     * @return JsonResponse
     */
    public
    function destroy()
    {
        $user = Auth::user();
        $empresa = Empresa::with('empleados')->find(Auth::user()->id);
        if ($empresa) {
            $empresa->delete();
            $data = [
                'message' => 'Empresa eliminada correctamente',
                'empresa' => $empresa
            ];
        } else {
            $data = [
                'message' => 'Empresa no existe'
            ];
        }
        return response()->json($data);
    }

    /**
     * Función iniciar sesión
     * @param Request $request
     * @return JsonResponse
     */
    public
    function login(
        Request $request
    ) {
        $empresa = Empresa::where('email', $request->email)->first();
        if ($empresa) {
            if (Hash::check($request->password, $empresa->password)) {
                $token = $empresa->createToken('auth_token')->plainTextToken;
                return response()->json([
                    "mensaje" => "Usuario logueado correctamente",
                    "token_type" => 'Bearer',
                    'token' => $token,
                    'empresa' => $empresa->id
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
     * Función cerrar sesión el usuario logueado
     * @return JsonResponse
     */
    public
    function logout(): JsonResponse
    {
        try {
            $user = auth()->user();

            if ($user) {
                if ($user instanceof Empresa) {
                    // Cerrar sesión de una Empresa
                    $user->tokens()->delete();
                    return response()->json(["message" => "Sesión de Empresa cerrada"]);
                } else {
                    // No cerrar sesión de un Empleado
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

    /**
     * Función que devuelve error ante cualquier error que se produzca
     * @return JsonResponse
     */
    public
    function paginaError()
    {
        return \response()->json([
            'message' => "Página no encontrada"
        ], 404);
    }
}
