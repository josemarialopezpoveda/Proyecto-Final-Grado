<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Caso>
 */
class CasoFactory extends Factory
{
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

        return [
            'empleado_id' => $this->faker->numberBetween(1, 3),
            //'asunto' => $this->faker->paragraph,
            'asunto' => $faker->text($faker->numberBetween(20, 30)),
            'activo' => $this->faker->boolean,
            'fechaCreacion' => $fechaCreacion,
        ];
    }
}
