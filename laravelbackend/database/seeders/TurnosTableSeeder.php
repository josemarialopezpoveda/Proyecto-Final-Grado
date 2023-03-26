<?php

namespace Database\Seeders;

use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TurnosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        DB::table('turnos')->insert([
            'empresa_id' => 1,
            'descripcion' => "DE LUNES A VIERNES DE 7 A 15",
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
        DB::table('turnos')->insert([
            'empresa_id' => 1,
            'descripcion' => "DE LUNES A VIERNES DE 9 A 17",
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
        DB::table('turnos')->insert([
            'empresa_id' => 1,
            'descripcion' => "DE LUNES A VIERNES DE 8 A 13 Y DE 16 A 19",
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
        DB::table('turnos')->insert([
            'empresa_id' => 1,
            'descripcion' => "DE SÁBADO A DOMINGO DE 8 A 16",
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
    }
}
