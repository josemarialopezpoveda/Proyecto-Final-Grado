<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TiemposTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tiempos')
            ->whereIn('empleado_id', function ($query) {
                $query->select('id')
                    ->from('empleados')
                    ->whereNotIn('empresa_id', [1, 2, 3]);
            })
            ->delete();;


        $lastTwoTimes = DB::table('tiempos')
            ->select('empleado_id', 'inicio', 'id')
            ->orderBy('inicio', 'desc')
            ->get()
            ->groupBy('empleado_id')
            ->map(function ($items) {
                return $items->take(2)->reverse();
            });

// Recorremos cada empleado
        foreach($lastTwoTimes as $key => $tiempos) {
            // Comprobamos si hay al menos dos tiempos para el empleado actual
            if($tiempos->count() == 2){
                // Comprobamos si los dos últimos tiempos del empleado actual son iguales
                if($tiempos[0]->inicio == $tiempos[1]->inicio){
                    // Eliminamos el último tiempo registrado para el empleado actual
                    DB::table('tiempos')->where('id', $tiempos[0]->id)->delete();
                }
            }
        }

        //Para hacer:
        //Si la última fecha registrada es null y menor que la fecha actual
        // entonces actualizar el campo fin con la hora correspondiente al fin del turno.

        /*$currentDate = Carbon::now()->format('Y-m-d H:i:s');
        DB::table('tiempos')
            ->whereNull('fin')
            ->where('inicio', '<', $currentDate)
            ->update([
                'fin' => DB::raw("CONCAT(DATE(inicio), ' 19:00:00')")
            ]);*/


    }

//        DB::table('tiempos')->insert([
//            'empleado_id' => 3,
//            'inicio' => '2023-03-01 06:58:37',
//            'fin' => '2023-03-01 15:02:21',
//            'created_at' => Carbon::now(),
//            'updated_at' => Carbon::now()
//        ]);
//        DB::table('tiempos')->insert([
//            'empleado_id' => 3,
//            'inicio' => '2023-03-02 06:55:01',
//            'fin' => '2023-03-02 15:00:40',
//            'created_at' => Carbon::now(),
//            'updated_at' => Carbon::now()
//        ]);
//        DB::table('tiempos')->insert([
//            'empleado_id' => 3,
//            'inicio' => '2023-03-03 07:01:20',
//            'fin' => '2023-03-03 15:03:18',
//            'created_at' => Carbon::now(),
//            'updated_at' => Carbon::now()
//        ]);
//        DB::table('tiempos')->insert([
//            'empleado_id' => 3,
//            'inicio' => '2023-03-06 06:59:00',
//            'created_at' => Carbon::now(),
//            'updated_at' => Carbon::now()
//        ]);

}
