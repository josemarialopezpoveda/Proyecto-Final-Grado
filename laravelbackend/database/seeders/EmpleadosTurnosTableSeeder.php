<?php

namespace Database\Seeders;

use App\Models\Empleado;
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
        $empleadosCount = Empleado::count();
        for ($i = 0; $i < $empleadosCount; $i++) {
            DB::table('empleados_turnos')->insert([
                'empleado_id' => $i + 1,
                'turno_id' => 1,
                'fechaInicioTurno' => "2023-01-01",
                'fechaFinTurno' => "2023-12-31",
                'activo' => 1
            ]);
        }

//        DB::table('empleados_turnos')->insert([
//            'empleado_id' => 1,
//            'turno_id' => 4,
//            'fechaInicioTurno' => "2023-03-01",
//            'fechaFinTurno' => "2023-06-30"
//        ]);
    }
}
