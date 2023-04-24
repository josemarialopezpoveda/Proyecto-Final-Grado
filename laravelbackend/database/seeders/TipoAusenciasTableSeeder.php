<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoAusenciasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipoausencias')->insert([
            'tipo' => 'BAJA',
            'descripcionAusencia' => "BAJA POR ENFERMEDAD COMÚN",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'BAJA',
            'descripcionAusencia' => "BAJA POR ACCIDENTE LABORAL",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'BAJA',
            'descripcionAusencia' => "BAJA POR MATERNIDAD",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'BAJA',
            'descripcionAusencia' => "BAJA POR PATERNIDAD",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'BAJA',
            'descripcionAusencia' => "BAJA POR RIESGO DURANTE EL EMBARAZO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'BAJA',
            'descripcionAusencia' => "BAJA POR ENFERMEDAD PROFESIONAL",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'AUSENCIA',
            'descripcionAusencia' => "AUSENCIA POR LICENCIA SIN SUELDO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'AUSENCIA',
            'descripcionAusencia' => "AUSENCIA POR PERMISO REMUNERADO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'AUSENCIA',
            'descripcionAusencia' => "OTRAS AUSENCIAS",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'VACACIONES',
            'descripcionAusencia' => "VACACIONES EMPLEADO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'tipo' => 'VACACIONES',
            'descripcionAusencia' => "VACACIONES EMPRESA",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
