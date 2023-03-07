<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class AusenciasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ausencias')->insert([
            'tipoausencias_id' => 1,
            'empleado_id' => 3,
            'descripcion' => "COVID-19. DURACIÓN BAJA 10 DÍAS",
            'fechaInicio' => "2023-02-25",
            'fechaFin' => "2023-03-03",
            'justificada' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('ausencias')->insert([
            'tipoausencias_id' => 2,
            'empleado_id' => 3,
            'descripcion' => "ESGUINCE DE TOBILLO. DURACIÓN BAJA 30 DÍAS",
            'fechaInicio' => Carbon::now(),
            'justificada' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('ausencias')->insert([
            'tipoausencias_id' => 2,
            'empleado_id' => 2,
            'descripcion' => "BRAZO DERECHO ROTO. DURACIÓN BAJA 60 DÍAS",
            'fechaInicio' => Carbon::now(),
            'justificada' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}