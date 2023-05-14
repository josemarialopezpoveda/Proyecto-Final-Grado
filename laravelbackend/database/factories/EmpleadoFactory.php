<?php

namespace Database\Factories;

use App\Helpers\Poblaciones;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

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
        $numSegSocial = $numSegSocial . $numSegSocial % 97;

        $nombre = mb_strtoupper($faker->firstName, 'UTF-8');
        $apellido = mb_strtoupper($faker->lastName, 'UTF-8');
        $emailNombre = str_replace(
            ' ',
            '',
            mb_strtolower($nombre, 'UTF-8')
        ); // Eliminar espacios en el nombre y convertir a minúsculas
        $emailNombre = str_replace(['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'],
            ['a', 'e', 'i', 'o', 'u', 'u', 'n'],
            $emailNombre);
        $emailApellido = str_replace(
            ' ',
            '',
            mb_strtolower($apellido, 'UTF-8')
        ); // Eliminar espacios en el apellido y convertir a minúsculas
        $emailApellido = str_replace(['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'],
            ['a', 'e', 'i', 'o', 'u', 'u', 'n'],
            $emailApellido);

        $email = $emailNombre . $emailApellido . '@correo.com';
        return [
            'nif' => $faker->unique()->dni,
            'empresa_id' => rand(1, 14),
            'nombre' => $nombre,
            'apellidos' => $apellido,
            'direccion' => mb_strtoupper($faker->streetAddress, 'UTF-8'),
            'cPostal' => $poblaciones[$aleatorio]['cPostal'],
            'provincia' => mb_strtoupper($poblaciones[$aleatorio]['provincia'], 'UTF-8'),
            'poblacion' => mb_strtoupper($poblaciones[$aleatorio]['poblacion'], 'UTF-8'),
            'pais' => "ESPAÑA",
            'telefono' => $faker->unique()->numerify('6########'),
            'fechaNacimiento' => $faker->dateTimeBetween($startBirthDate, $endBirthDate),
            //'email' => $faker->unique()->safeEmail,
            'email' => $email,
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
