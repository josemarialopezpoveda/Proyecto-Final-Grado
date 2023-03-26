<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CasosEmpleadosTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('casos_empleados')->insert([
            'caso_id' => 1,
            'empleado_id' => 1,
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
    }
}
