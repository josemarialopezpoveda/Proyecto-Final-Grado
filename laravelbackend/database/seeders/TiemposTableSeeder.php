<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TiemposTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('tiempos')->insert([
            'empleado_id' => 3,
            'inicio' => '2023-03-01 06:58:37',
            'fin' => '2023-03-01 15:02:21',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('tiempos')->insert([
            'empleado_id' => 3,
            'inicio' => '2023-03-02 06:55:01',
            'fin' => '2023-03-02 15:00:40',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('tiempos')->insert([
            'empleado_id' => 3,
            'inicio' => '2023-03-03 07:01:20',
            'fin' => '2023-03-03 15:03:18',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('tiempos')->insert([
            'empleado_id' => 3,
            'inicio' => '2023-03-06 06:59:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
