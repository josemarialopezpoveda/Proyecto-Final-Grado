<?php

namespace Database\Seeders;

use App\Models\Empleado;
use Illuminate\Database\Seeder;

class DeleteEmployeeTimesSeeder extends Seeder {
    public function run()
    {
        $empresaId = 1; // ID de la empresa
        $fechaInicio = '2023-04-01 00:00:00'; // Fecha de inicio del rango
        $fechaFin = '2023-04-16 23:59:59'; // Fecha de fin del rango

        $empleados = Empleado::where('empresa_id', $empresaId)->get();

        foreach ($empleados as $empleado) {
            $empleado->tiempos()->whereBetween('inicio', [$fechaInicio, $fechaFin])->delete();
        }
    }
}
