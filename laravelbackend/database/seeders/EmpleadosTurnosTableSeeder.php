<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpleadosTurnosTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $empleados = DB::table('empleados')
            ->whereIn('empresa_id', [1, 2, 3])
            ->get();
        $turno_id = 1;

        foreach ($empleados as $empleado) {
            switch ($empleado->empresa_id) {
                case 1:
                    $turno_id = 1;
                    break;
                case 2:
                    $turno_id = 2;
                    break;
                case 3:
                    $turno_id = 3;
                    break;
                default:
                    break;
            }
            //$activo = ($empleado->id === 1) ? false : true; //Al empleado 1 le pone Activo a falso.
            DB::table('empleados_turnos')->insert([
                'empleado_id' => $empleado->id,
                'turno_id' => $turno_id,
                'fechaInicioTurno' => "2023-01-01",
                'fechaFinTurno' => "2023-12-31",
                'activo' => true
            ]);
        }
    }
}
