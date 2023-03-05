<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmpleadosTurnosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('empleados_turnos')->insert([
            'empleado_id' => 1,
            'turno_id' => 1,
            'fechaInicioTurno' => "2023-01-01",
            'fechaFinTurno' => "2023-02-28",
            'activo' => 0
        ]);
        DB::table('empleados_turnos')->insert([
            'empleado_id' => 1,
            'turno_id' => 4,
            'fechaInicioTurno' => "2023-03-01",
            'fechaFinTurno' => "2023-06-30"
        ]);
    }
}
