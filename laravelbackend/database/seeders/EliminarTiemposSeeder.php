<?php

namespace Database\Seeders;

use App\Models\Empleado;
use App\Models\Tiempo;
use Illuminate\Database\Seeder;

/* Elimina los tiempos creados a empleados con ausencias*/

class EliminarTiemposSeeder extends Seeder {
    public function run()
    {
        $empleados = Empleado::all();

        foreach ($empleados as $empleado) {
            $ausencias = $empleado->ausencias;

            foreach ($ausencias as $ausencia) {
                if ($ausencia->fechaFin) {
                    Tiempo::where('empleado_id', $empleado->id)
                        ->whereBetween('inicio', [$ausencia->fechaInicio, $ausencia->fechaFin])
                        ->delete();
                } else {
                    Tiempo::where('empleado_id', $empleado->id)
                        ->where('inicio', '>=', $ausencia->fechaInicio)
                        ->delete();
                }
            }
        }
    }
}

