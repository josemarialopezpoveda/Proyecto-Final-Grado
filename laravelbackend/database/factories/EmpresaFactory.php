<?php

namespace Database\Factories;

use Illuminate\Support\Carbon;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Empresa>
 */
class EmpresaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('es_ES');
        $provincias = array(
            'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos',
            'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca',
            'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
            'Islas Baleares', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida', 'Lugo',
            'Madrid', 'Málaga', 'Murcia',
            'Navarra', 'Orense', 'Palencia', 'Pontevedra',
            'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria',
            'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
        );

        return [
            'cif' => $faker->vat,
            'razonSocial' => strtoupper(($faker->company('Industria Textil', 'SL'))),
            'nombreComercial' => strtoupper($faker->company),
            'direccion' => strtoupper($faker->streetAddress),
            'cPostal' => $faker->postcode,
            'poblacion' => $faker->city,
            'provincia' => $faker->randomElement($provincias),
            'pais' => "ESPAÑA",
            'telefonoFijo' => $faker->numerify('9########'),
            'telefonoMovil' => $faker->numerify('6########'),
            'email' => $faker->email,
            'password' => Hash::make('12345678'),
            'ultimaConexion' => Carbon::now(),
            'activo' => true,
            'fechaAlta' => Carbon::now()
        ];
    }
}