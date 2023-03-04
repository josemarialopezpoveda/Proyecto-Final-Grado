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
            'descripcion' => "BAJA POR ENFERMEDAD COMÚN",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "BAJA POR ACCIDENTE LABORAL",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "BAJA POR MATERNIDAD",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "BAJA POR PATERNIDAD",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "BAJA POR RIESGO DURANTE EL EMBARAZO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "BAJA POR ENFERMEDAD PROFESIONAL",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "AUSENCIA POR LICENCIA SIN SUELDO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "AUSENCIA POR PERMISO REMUNERADO",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "AUSENCIA POR VACACIONES",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('tipoausencias')->insert([
            'descripcion' => "OTRAS AUSENCIAS",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
