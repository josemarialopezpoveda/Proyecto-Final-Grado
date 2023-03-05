<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/**
 *
 */
class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     * Función que devuelve todos los empleados del usuario logueado como empresa.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $empleado = Empleado::all(Auth::user());
        return response()->json($empleado);
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
     * Display the specified resource.
     * Función que muestra los datos del empleado logueado.
     * @param \App\Models\empleado $empleado
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = Auth::user();
        $empleado = Empleado::find($user["id"]);
        if ($empleado) {
            return response()->json($empleado);
        } else {
            $data = [
                'message' => 'Empleado no existe'
            ];
            return response()->json($data);
        }
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
    public function destroy($id)
    {
        $user = Auth::user();  //Un empleado puede borrarlo el administrador de la empresa.

        $empleado = Empleado::find($id);

        if ($empleado) {
            $empleado->delete();
            $data = [
                'user' => $user,
                'message' => 'Empleado eliminado correctamente',
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
     * Función iniciar sesión.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $empleado = Empleado::where('email', $request->email)->first();
        if ($empleado) {
            if (Hash::check($request->password, $empleado->password)) {
                $token = $empleado->createToken('auth_token')->plainTextToken;
                return response()->json([
                    "mensaje" => "Usuario logueado correctamente",
                    "token_type" => 'Bearer',
                    'token' => $token,
                    'empleado' => $empleado->id,
                    'empresa' => $empleado->empresa_id
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
        auth()->user()->tokens()->delete();
        return response()->json(["message" => "Sesión cerrada"]);
    }


    public function attach(Request $request)
    {
        $empleado = Empleado::find($request->empleado_id);
        $empleado->turnos()->attach($request->turno_id, ['fechaInicioTurno' => $request->fechaInicioTurno, 'fechaFinTurno' => $request->fechaFinTurno]);
        $data = [
            'message' => 'Turno attach correctamente',
            'empleado' => $empleado
        ];
        return response()->json($data);
    }
}
