<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ausencia>
 */
class AusenciaFactory extends Factory {
    public function definition(): array
    {
        $fechaInicio = '2023-04-01';
        $fechaFin = '2023-04-16';
        $descripcion = 'VACACIONES SEMANA SANTA';
        $justificada = true;
        $tipoAusenciaCodigo = 11;

        return [
            'fechaInicio' => $fechaInicio,
            'fechaFin' => $fechaFin,
            'descripcion' => $descripcion,
            'justificada' => $justificada,
            'tipoausencias_id' => $tipoAusenciaCodigo,
            'empleado_id' => $this->faker->randomDigit, // Valor aleatorio generado por Faker
        ];
    }
}
