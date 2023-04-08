<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CasosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('casos')->insert([
            'empleado_id' => 1,
            'asunto' => "Solicitud de vacaciones",
            'activo' => true,
            'fechaCreacion' => Carbon::now('Europe/Madrid'),
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);

        DB::table('casos')->insert([
            'empleado_id' => 3,
            'asunto' => "Error hora de entrada el día 05/04/23",
            'activo' => true,
            'fechaCreacion' => Carbon::now('Europe/Madrid'),
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
    }
}
