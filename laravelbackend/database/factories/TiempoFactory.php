<?php

namespace Database\Factories;

use Faker\Factory as Faker;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tiempo>
 */
class TiempoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('es_ES');

        $fechaInicio = '2023-01-02';
        $fechaFin = '2023-02-28';
        $horaInicioI = '06:45:00';
        $horaInicioF = '7:15:00';
        $horaFinI = '14:45:00';
        $horaFinF = '15:30:00';

        $fechaActual = Carbon::parse($fechaInicio);
        $fechaHoraInicio = [];
        $fechaHoraFin = [];

        while ($fechaActual <= Carbon::parse($fechaFin)) {
            if (!$fechaActual->isWeekend()) {
                $horaAleatoriaE = $faker->dateTimeBetween($horaInicioI, $horaInicioF)->format('H:i:s');
                $horaAleatoriaS = $faker->dateTimeBetween($horaFinI, $horaFinF)->format('H:i:s');
                $fechaHoraEntrada = Carbon::instance($fechaActual);
                $fechaHoraSalida = Carbon::instance($fechaActual);
                $fechaHoraEntrada->setTimeFromTimeString($horaAleatoriaE);
                $fechaHoraSalida->setTimeFromTimeString($horaAleatoriaS);
                //echo "Hora Entrada: " . Carbon::parse($fechaHoraEntrada)->format('d/m/Y H:i:s') . "\n";
                $fechaHoraInicio[] = $fechaHoraEntrada;
                $fechaHoraFin[]=$fechaHoraSalida;
            }
            $fechaActual->addDay();
        }


        static $indiceInicio = 0;
        static $indiceFin = 0;

        return [
            'empleado_id' => 1,
            'created_at' => $fechaHoraInicio[$indiceInicio],
            'updated_at' => $fechaHoraFin[$indiceFin],
            'inicio' => $fechaHoraInicio[$indiceInicio++ %count($fechaHoraInicio)],
            'fin' => $fechaHoraFin[$indiceFin++ %count($fechaHoraFin)]
        ];
    }
}
