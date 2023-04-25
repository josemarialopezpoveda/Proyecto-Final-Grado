<?php

namespace Database\Factories;

use App\Models\Tiempo;
use Faker\Factory as Faker;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Helpers\Holidays;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tiempo>
 */
class TiempoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    private static int $contador = 1;
    public function definition(): array
    {
        $faker = Faker::create('es_ES');

        $empleadoId = self::$contador;
        self::$contador++;

        $fechaInicio = '2023-01-01';
        $fechaFin = Carbon::now()->format('Y-m-d');
        $horaInicioI = '06:45:00';
        $horaInicioF = '7:15:00';
        $horaFinI = '14:45:00';
        $horaFinF = '15:30:00';

        $fechaActual = Carbon::parse($fechaInicio);

        while ($fechaActual <= Carbon::parse($fechaFin)) {
            $diaSemana = $fechaActual->format('N');
            if (!$fechaActual->isWeekend() && !Holidays::isHoliday($fechaActual)) {
                if ($diaSemana == 5) { // Si la fecha actual es un viernes
                    $horaAleatoriaE = $faker->dateTimeBetween(Carbon::parse($horaInicioI)->addHours(2), Carbon::parse($horaInicioF)->addHours(2))->format('H:i:s');
                    $horaAleatoriaS = $faker->dateTimeBetween(Carbon::parse($horaFinI)->addHours(2), Carbon::parse($horaFinF)->addHours(2))->format('H:i:s');
                } else{
                    $horaAleatoriaE = $faker->dateTimeBetween($horaInicioI, $horaInicioF)->format('H:i:s');
                    $horaAleatoriaS = $faker->dateTimeBetween($horaFinI, $horaFinF)->format('H:i:s');
                }
                $fechaHoraEntrada = Carbon::instance($fechaActual);
                $fechaHoraSalida = Carbon::instance($fechaActual);
                $fechaHoraEntrada->setTimeFromTimeString($horaAleatoriaE);
                $fechaHoraSalida->setTimeFromTimeString($horaAleatoriaS);

                if ($fechaActual != Carbon::parse($fechaFin)) {
                    Tiempo::create([
                        'empleado_id' => $empleadoId,
                        'created_at' => $fechaHoraEntrada,
                        'updated_at' => $fechaHoraSalida,
                        'inicio' => $fechaHoraEntrada,
                        'fin' => $fechaHoraSalida,
                    ]);
                }
            }
            $fechaActual->addDay();
        }

        return [
            'empleado_id' => $empleadoId,
            'created_at' => $fechaHoraEntrada,
            'updated_at' => $fechaHoraSalida,
            'inicio' => $fechaHoraEntrada,
        ];

    }
}
