<?php

namespace App\Http\Controllers;

use App\Helpers\Auxiliares;
use App\Models\Ausencia;
use App\Models\Tipoausencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TipoausenciaController extends Controller {
    /**
     * Display a listing of the resource.
     * Devuelve todos los tipos de ausencia de la empresa logueda.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $tiposAusencia = Tipoausencia::all()->where('empresa_id', $empresaId);
            if (count($tiposAusencia) > 0) {
                return response()->json($tiposAusencia);
            } else {
                $data = ['message' => 'No existe tipos de ausencia para la empresa.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($tipoAusenciaId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $tipoAusencia = Tipoausencia::where('empresa_id', $empresaId)->where('id', $tipoAusenciaId)->first();
            if ($tipoAusencia) {
                return response()->json($tipoAusencia);
            } else {
                $data = ['message' => 'Tipo de ausencia no existe.'];
                return response()->json($data, 404);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
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
            if ($request->empresa_id == $empresaId) {
                $tipoAusencia = new Tipoausencia();
                $tipoAusencia->empresa_id = $request->empresa_id;
                $tipoAusencia->tipo = $request->tipo;
                $tipoAusencia->descripcion = $request->descripcion;
                $tipoAusencia->save();
                $data = [
                    'message' => 'Tipo de ausencia creado correctamente',
                    'tipo de ausencia' => $tipoAusencia
                ];
                return response()->json($data);
            } else {
                $data = ['message' => 'No autorizado.'];
                return response()->json($data, 401);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $ausenciaId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            if ($request->empresa_id == $empresaId) {
                $tipoAusencia = Tipoausencia::find($ausenciaId);
                if ($tipoAusencia) {
                    $ausenciasAsociadas = Ausencia::where('tipoausencias_id', $tipoAusencia->id)->exists();
                    if (!$ausenciasAsociadas) {
                        $tipoAusencia->tipo = $request->tipo;
                        $tipoAusencia->descripcion = $request->descripcion;
                        $tipoAusencia->save();
                        $data = [
                            'message' => 'Tipo de ausencia actualizado correctamente',
                            'tipo de ausencia' => $tipoAusencia
                        ];
                        return response()->json($data);
                    } else {
                        $data = [
                            'message' => 'No se puede modificar, tiene ausencias asociadas'
                        ];
                        return response()->json($data, 403);
                    }
                } else {
                    $data = [
                        'message' => 'Tipo de ausencia no existe'
                    ];
                    return response()->json($data, 404);
                }
            } else {
                $data = ['message' => 'No autorizado.'];
                return response()->json($data, 401);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($tipoAusenciaId): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $empresaId = Auxiliares::verificarAutorizacionEmpresa($user);
        if (is_numeric($empresaId)) {
            $tipoAusencia = Tipoausencia::find($tipoAusenciaId);
            if ($tipoAusencia) {
                if ($tipoAusencia->empresa_id == $empresaId) {
                    $ausenciasAsociadas = Ausencia::where('tipoausencias_id', $tipoAusencia->id)->exists();
                    if (!$ausenciasAsociadas) {
                        $tipoAusencia->delete();
                        $data = [
                            'message' => 'Tipo de ausencia eliminado correctamente',
                            'tipo de ausencia' => $tipoAusencia
                        ];
                        return response()->json($data);
                    } else {
                        $data = ['message' => 'No se puede eliminar, tiene ausencias asociadas'];
                        return response()->json($data, 403);
                    }
                } else {
                    $data = ['message' => 'No autorizado.'];
                    return response()->json($data, 401);
                }
            } else {
                $data = ['message' => 'Tipo de ausencia no existe'];
                return response()->json($data);
            }
        } else {
            $data = ['message' => $empresaId['message'],];
            return response()->json($data, 403);
        }
    }
}
