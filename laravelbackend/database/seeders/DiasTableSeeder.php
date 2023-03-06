<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 1,
            'horaInicioM' => '07:00:00',
            'horaFinM' => '15:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 2,
            'horaInicioM' => '07:00:00',
            'horaFinM' => '15:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 3,
            'horaInicioM' => '07:00:00',
            'horaFinM' => '15:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 4,
            'horaInicioM' => '07:00:00',
            'horaFinM' => '15:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 5,
            'horaInicioM' => '09:00:00',
            'horaFinM' => '17:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 6,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 1,
            'diaSemana' => 7,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 1,
            'horaInicioM' => '09:00:00',
            'horaFinM' => '17:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 2,
            'horaInicioM' => '09:00:00',
            'horaFinM' => '17:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 3,
            'horaInicioM' => '09:00:00',
            'horaFinM' => '17:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 4,
            'horaInicioM' => '09:00:00',
            'horaFinM' => '17:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 5,
            'horaInicioM' => '09:00:00',
            'horaFinM' => '17:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 6,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 2,
            'diaSemana' => 7,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 1,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '13:00:00',
            'horaInicioT' => '16:00:00',
            'horaFinT' => '19:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 2,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '13:00:00',
            'horaInicioT' => '16:00:00',
            'horaFinT' => '19:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 3,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '13:00:00',
            'horaInicioT' => '16:00:00',
            'horaFinT' => '19:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 4,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '13:00:00',
            'horaInicioT' => '16:00:00',
            'horaFinT' => '19:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 5,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '13:00:00',
            'horaInicioT' => '16:00:00',
            'horaFinT' => '19:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 6,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 3,
            'diaSemana' => 7,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 1,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 2,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 3,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 4,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 5,
            'horaInicioM' => '00:00:00',
            'horaFinM' => '00:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 6,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '16:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('dias')->insert([
            'turno_id' => 4,
            'diaSemana' => 7,
            'horaInicioM' => '08:00:00',
            'horaFinM' => '16:00:00',
            'horaInicioT' => '00:00:00',
            'horaFinT' => '00:00:00',
            'horaInicioN' => '00:00:00',
            'horaFinN' => '00:00:00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}