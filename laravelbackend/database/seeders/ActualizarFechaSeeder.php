<?php

namespace Database\Seeders;

use App\Models\Tiempo;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ActualizarFechaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiempos = Tiempo::all(); // Obtener todos los tiempos

        echo $tiempos;
        foreach ($tiempos as $tiempo) {
            echo $tiempo->empleado_id . "\n";
            $nuevaFecha = Carbon::today();
            $hora = Carbon::createFromFormat('Y-m-d H:i:s', $tiempo->inicio)->format('H:i:s');

            $nuevaFecha->setTimeFromTimeString($hora);

            $tiempo->inicio = $nuevaFecha;
            $tiempo->save(); // Guardar los cambios en la base de datos
        }
    }
}