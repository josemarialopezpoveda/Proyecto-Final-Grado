<?php

namespace Database\Factories;


use App\Models\Empleado;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Caso>
 */
class CasoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('es_ES');
        $fechaMinima = '2023-01-02';
        $fechaMaxima = now()->format('Y-m-d H:i:s');
        $fechaCreacion = $this->faker->dateTimeBetween($fechaMinima, $fechaMaxima);
        $empleados = Empleado::whereIn('empresa_id', [1, 2])->pluck('id')->toArray();


        return [
            'empleado_id' => $this->faker->randomElement($empleados),
            'asunto' => $faker->text($faker->numberBetween(20, 30)),
            'activo' => $this->faker->boolean,
            'fechaCreacion' => $fechaCreacion,
        ];
    }
}
