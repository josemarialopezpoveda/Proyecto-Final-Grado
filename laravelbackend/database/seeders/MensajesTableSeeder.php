<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class MensajesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('mensajes')->insert([
            'casos_id' => 1,
            'emisor'=> 1,
            'receptor'=> 2,
            'mensaje' => "Solicito día de vacaciones el 17/04/23",
            'horaEnvio' => Carbon::now('Europe/Madrid')->subDay(),
            'created_at' => Carbon::now('Europe/Madrid')->subDay(),
            'updated_at' => Carbon::now('Europe/Madrid')->subDay(),
        ]);
        DB::table('mensajes')->insert([
            'casos_id' => 1,
            'emisor'=> 2,
            'receptor'=> 1,
            'mensaje' => "OK. Tomo nota. Concedido.",
            'horaEnvio' => Carbon::now('Europe/Madrid'),
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid')
        ]);
    }
}
