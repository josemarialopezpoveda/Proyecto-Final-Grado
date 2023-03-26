<?php

namespace Database\Factories;

use App\Helpers\Poblaciones;
use App\Models\Empleado;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmpleadoFactory>
 */
class EmpleadoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('es_ES');
        $poblaciones = Poblaciones::all();
        $aleatorio = rand(0, count($poblaciones) - 1);
        $startBirthDate = '1963-01-01 00:00:00';
        $endBirthDate = '2008-12-31 23:59:59';
        $starUpDate = '2023-01-02 00:00:00';
        $endUpDate = '2023-02-28 20:00:00';
        do {
            $numSegSocial = $faker->numerify('##########');
        } while ($numSegSocial[0] === '0');
        $numSegSocial = $numSegSocial . $numSegSocial%97;

        return [
            'nif' => $faker->unique()->dni,
            'empresa_id' => rand(1,14),
            'nombre' => strtoupper($faker->firstName),
            'apellidos' => strtoupper($faker->lastName),
            'direccion' => strtoupper($faker->streetAddress),
            'cPostal' => $poblaciones[$aleatorio]['cPostal'],
            'provincia' => strtoupper($poblaciones[$aleatorio]['provincia']),
            'poblacion' => strtoupper($poblaciones[$aleatorio]['poblacion']),
            'pais' => "ESPAÑA",
            'telefono' => $faker->unique()->numerify('6########'),
            'fechaNacimiento' => $faker->dateTimeBetween($startBirthDate, $endBirthDate),
            'email' =>  $faker->unique()->safeEmail,
            'password' => Hash::make('12345678'),
            'numSegSoc' => $numSegSocial,
            'ultimaConexion' => Carbon::now('Europe/Madrid'),
            'activo' => true,
            'fechaAlta' => $faker->dateTimeBetween($starUpDate, $endUpDate),
            'tipoEmpleado' => "Trabajador",
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid'),

        ];
    }
}
