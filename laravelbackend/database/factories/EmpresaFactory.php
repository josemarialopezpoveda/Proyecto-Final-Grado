<?php

namespace Database\Factories;

use App\Helpers\Poblaciones;
use App\Helpers\Provincias;
use Faker\Factory as Faker;
use Illuminate\Support\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
        $faker2 = Faker::create();
        $poblaciones = Poblaciones::all();
        $aleatorio = rand(0, count($poblaciones) - 1);


/*         $image = $faker2->image('public/seed_images', 400, 300, null, false);
        //$image = public_path('seed_images\logo1.jpg');
       // $path = Storage::disk('public')->putFile('images', $image);
        $file = new UploadedFile($image, 'random_image.jpg', null, null, true);
        $path = $file->store('public/images'); */


        return [
            'cif' => $faker->unique()->vat,
            'razonSocial' => strtoupper($faker->company),
            'nombreComercial' => strtoupper($faker->company),
            'direccion' => strtoupper($faker->streetName()) .', '. $faker->buildingNumber(),
            'cPostal'=> $poblaciones[$aleatorio]['cPostal'],
            'provincia' => strtoupper($poblaciones[$aleatorio]['provincia']),
            'poblacion' => strtoupper($poblaciones[$aleatorio]['poblacion']),
            'pais' => "ESPAÑA",
            'telefonoFijo' => $faker->unique()->numerify('9########'),
            'telefonoMovil' => $faker->unique()->numerify('6########'),
            'email' =>  $faker->unique()->safeEmail,
            'password' => Hash::make('12345678'),
            //'logotipo' => $faker->image('public/storage/images',640,480, null, false),
            'ultimaConexion' => Carbon::now('Europe/Madrid'),
            'activo' => true,
            'fechaAlta' => Carbon::now('Europe/Madrid'),
            'created_at' => Carbon::now('Europe/Madrid'),
            'updated_at' => Carbon::now('Europe/Madrid'),
        ];
    }
}
