<?php

namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Empresa;
use Illuminate\Validation\Rule;

/**
 *
 */
class EmpresaController extends Controller
{


    /**
     * Función que devuelve todas las empresas.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $empresas = Empresa::with('empleados')->get();
        return response()->json($empresas);
    }

    /**
     * Función que crea una empresa
     * @param Request $request
     * @return array|JsonResponse
     */
    public function store(Request $request)
    {
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
     * Función que muestra la empresa del usuario logueado
     * @return JsonResponse
     */
    public function show()
    {
        $user = Auth::user();
        $empresa = Empresa::with('empleados')->find(Auth::user()->id);
        if ($empresa) {
            $data = [
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
     *  Función que actualiza la empresa del usuario logueado
     * @param Request $request
     * @return array|JsonResponse
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $empresa = Empresa::with('empleados')->find(Auth::user()->id);

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
    public function destroy()
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
    public function login(Request $request)
    {
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
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(["message" => "Sesión cerrada"]);
    }

    /**
     * Función que devuelve error ante cualquier error que se produzca
     * @return JsonResponse
     */
    public function paginaError()
    {
        return \response()->json([
            'message' => "Página no encontrada"
        ], 404);
    }
}
