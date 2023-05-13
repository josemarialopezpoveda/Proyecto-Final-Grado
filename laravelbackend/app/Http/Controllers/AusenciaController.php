<?php

namespace App\Http\Controllers;

use App\Helpers\Auxiliares;
use App\Models\Ausencia;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tipoausencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AusenciaController extends Controller {
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $empresa = Empresa::find($empresaId);
            $ausencias = $empresa->empleados()->with('ausencias')->get()->pluck('ausencias')->flatten();
            if (!$ausencias->isEmpty()) {
                $data = ['ausencias' => $ausencias,];
                return response()->json($data);
            } else {
                $data = ['message' => 'No existen ausencias'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    public function show($idAusencia): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $ausencia = DB::table('ausencias')->where('id', $idAusencia)->first();
            if ($ausencia) {
                $empleado = DB::table('empleados')->where('id', $ausencia->empleado_id)->first();
                // Comprobar que el empleado pertenezca a la empresa del usuario logueado.
                if ($empleado->empresa_id === $empresaId) {
                    $data = ['ausencia' => $ausencia,];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'La ausencia no pertenece a la empresa'];
                    return response()->json($data, 400);
                }
            } else {
                $data = ['message' => 'Ausencia no existe'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    public function ausenciasEmpleados(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);

        if (is_numeric($empresaId)) {
            // Obtener IDs de los empleados de la empresa
            $empleados = DB::table('empleados')
                ->where('empresa_id', $empresaId)
                ->select('id')
                ->get();
            if (count($empleados) > 0) {
                $ausencias = DB::table('ausencias')
                    ->whereIn('empleado_id', $empleados->pluck('id')->toArray())
                    ->join('tipoausencias', 'ausencias.tipoausencias_id', '=', 'tipoausencias.id')
                    ->join('empleados', 'ausencias.empleado_id', '=', 'empleados.id')
                    ->select(
                        'ausencias.*',
                        'tipoausencias.descripcion as descripcionAusencia',
                        'tipoausencias.tipo as tipo',
                        'empleados.nombre as nombreEmpleado'
                    )
                    ->get();
                if (count($ausencias) > 0) {
                    $data = ['ausencias' => $ausencias];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'La empresa no tiene ausencias'];
                    return response()->json($data, 404);
                }
            } else {
                $data = ['message' => 'La empresa no tiene empleados'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function ausenciasEmpleado($empleadoId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $loginOk = Auxiliares::verificarAutorizacionEmpleado($empleadoId, $user);
        if ($loginOk === true) {
            $ausencias = DB::table('ausencias')
                ->where('empleado_id', $empleadoId)
                ->join('tipoausencias', 'ausencias.tipoausencias_id', '=', 'tipoausencias.id')
                ->join('empleados', 'ausencias.empleado_id', '=', 'empleados.id')
                ->select(
                    'ausencias.*',
                    'tipoausencias.descripcion as descripcionAusencia',
                    'tipoausencias.tipo as tipo',
                    'empleados.nombre as nombreEmpleado'
                )
                ->get();
            if (count($ausencias) != 0) {
                $data = ['ausencias' => $ausencias];
                return response()->json($data);
            } else {
                $data = ['message' => 'El empleado no tiene ausencias'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $loginOk['message'],];
            return response()->json($data, 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $tipoAusencia = Tipoausencia::find($request->tipoausencias_id);
            if ($tipoAusencia) {
                $empleado = Empleado::find($request->empleado_id);
                if ($empleado && $empleado->empresa_id == $empresaId) {
                    $ausencia = new Ausencia();
                    $tipoAusencia = $this->getAusencia($request, $ausencia);
                    $data = [
                        'message' => 'Ausencia creada correctamente',
                        'tipo de ausencia' => $tipoAusencia["descripcion"],
                        'ausencia' => $ausencia
                    ];
                    return response()->json($data);
                } else {
                    $data = ['message' => 'Empleado no existe'];
                    return response()->json($data, 404);
                }
            } else {
                $data = ['message' => 'Tipo de ausencia no existe'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 401);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $ausencia = Ausencia::find($id);
            if ($ausencia) {
                $tipoAusencia = Tipoausencia::find($request->tipoausencias_id);
                if ($tipoAusencia && $tipoAusencia->empresa_id == $empresaId) {
                    $empleado = Empleado::find($ausencia->empleado_id);
                    if ($empleado && $empleado->empresa_id == $empresaId && $empleado->id == $request->empleado_id) {
                        $tipoAusencia = $this->getAusencia($request, $ausencia);
                        $data = [
                            '$empresaId'=>$empresaId,
                            '$tipoAusencia->empresa_id'=>$tipoAusencia->empresa_id,
                            '$empleado->empresa_id'=>$empleado->empresa_id,
                            'message' => 'Ausencia modificada correctamente',
                            'tipo de ausencia' => $tipoAusencia["descripcion"],
                            'ausencia' => $ausencia
                        ];
                        return response()->json($data);
                    }
                    else {
                        $data = ['message' => 'Empleado no existe'];
                        return response()->json($data, 404);
                    }
                } else {
                    $data = ['message' => 'Tipo de ausencia no existe'];
                    return response()->json($data, 404);
                }
            } else {
                $data = ['message' => 'Ausencia no existe'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $ausenciaId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $ausencia = Ausencia::find($ausenciaId);
            if ($ausencia) {
                $empleado = Empleado::find($ausencia->empleado_id);
                if ($empleado && $empleado->empresa_id == $empresaId) {
                    $ausencia->delete();
                    $data = [
                        'message' => 'Ausencia eliminada correctamente',
                        'tipo de ausencia' => $ausencia
                    ];
                    return response()->json($data);
                }
                else {
                    $data = ['message' => 'Empleado no existe'];
                    return response()->json($data, 404);
                }
            } else {
                $data = ['message' => 'Ausencia no existe'];
                return response()->json($data, 404);
            }

        }
        else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 401);
        }
    }

    /**
     * @param Request $request
     * @param $ausencia
     * @return mixed
     */
    public function getAusencia(Request $request, $ausencia)
    {
        $ausencia->tipoausencias_id = $request->tipoausencias_id;
        $ausencia->empleado_id = $request->empleado_id;
        $ausencia->descripcion = $request->descripcion;
        $ausencia->fechaInicio = $request->fechaInicio;
        $ausencia->fechaFin = $request->fechaFin;
        $ausencia->justificada = $request->justificada;
        $ausencia->save();
        $tipoAusencia = Tipoausencia::find($request->tipoausencias_id);
        return $tipoAusencia;
    }
}


