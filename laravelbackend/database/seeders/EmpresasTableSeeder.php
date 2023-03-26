<?php

namespace Database\Seeders;

use App\Models\Empresa;
use Illuminate\Database\Seeder;

use Illuminate\Support\Carbon;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class EmpresasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('es_ES');

        // Antes de ejecutar el seeder borra el contenido del directorio storage/app/public/images
        Storage::disk('public')->deleteDirectory('images');

        $empresa1 = new Empresa;
        $empresa1->cif = 'B60741428';
        $empresa1->razonSocial = 'PERSIANAS, S.L.';
        $empresa1->nombreComercial = 'PERSIANAS FOR ALL';
        $empresa1->direccion = 'NUEVA, 20';
        $empresa1->cPostal = '03600';
        $empresa1->poblacion = 'ELDA';
        $empresa1->provincia = 'ALICANTE';
        $empresa1->pais = 'ESPAÑA';
        $empresa1->telefonoFijo = '966966966';
        $empresa1->telefonoMovil = '666666666';
        $empresa1->email = 'persianas@persianas.com';
        $empresa1->password = Hash::make('12345678');
        $empresa1->ultimaConexion = Carbon::now('Europe/Madrid');
        $empresa1->activo = true;
        $empresa1->fechaAlta = '2023-01-01';
        $empresa1->created_at = '2023-01-01';
        $empresa1->updated_at = Carbon::now('Europe/Madrid');
//        $file1 = public_path('seed_images\logo1.jpg');
//        $path1 = Storage::disk('public')->putFile('images', $file1);
//        $empresa1->logotipo = $path1;
        $empresa1->save();



        $empresa2 = new Empresa;
        $empresa2->cif = 'B79553855';
        $empresa2->razonSocial = 'ZAPATOS, S.A.';
        $empresa2->nombreComercial = 'KIDS SHOES';
        $empresa2->direccion = 'MAYOR, 1';
        $empresa2->cPostal = '03630';
        $empresa2->poblacion = 'PETRER';
        $empresa2->provincia = 'ALICANTE';
        $empresa2->pais = 'ESPAÑA';
        $empresa2->telefonoFijo = '955955955';
        $empresa2->telefonoMovil = '666777888';
        $empresa2->email = 'zapatos@zapatos.com';
        $empresa2->password = Hash::make('12345678');
        $empresa2->ultimaConexion = Carbon::now('Europe/Madrid');
        $empresa2->activo = true;
        $empresa2->fechaAlta = '2023-01-01';
        $empresa2->created_at = '2023-01-01';
        $empresa2->updated_at = Carbon::now('Europe/Madrid');
//        $file2 = public_path('seed_images\logo2.png');
//        $path2 = Storage::disk('public')->putFile('images', $file2);
//        $empresa2->logotipo = $path2;
        $empresa2->save();

        $empresa3 = new Empresa;
        $empresa3->cif = 'B62531108';
        $empresa3->razonSocial = 'VINOS, S.L.';
        $empresa3->nombreComercial = 'VINOTECA DON SIMON';
        $empresa3->direccion = 'TRAVESIA LA VIRGEN';
        $empresa3->cPostal = '13001';
        $empresa3->poblacion = 'TOMELLOSO';
        $empresa3->provincia = 'CIUDAD REAL';
        $empresa3->pais = 'ESPAÑA';
        $empresa3->telefonoFijo = '944944944';
        $empresa3->telefonoMovil = '666555444';
        $empresa3->email = 'vinos@vinos.com';
        $empresa3->password = Hash::make('12345678');
        $empresa3->ultimaConexion = Carbon::now('Europe/Madrid');
        $empresa3->activo = true;
        $empresa3->fechaAlta = '2023-01-01';
        $empresa3->created_at = '2023-01-01';
        $empresa3->updated_at = Carbon::now('Europe/Madrid');
//        $file3 = public_path('seed_images\logo3.png');
//        $path3 = Storage::disk('public')->putFile('images', $file3);
//        $empresa3->logotipo = $path3;
        $empresa3->save();

        $empresa4 = new Empresa;
        $empresa4->cif = 'B13883608';
        $empresa4->razonSocial = 'HIERROS, S.A.';
        $empresa4->nombreComercial = 'ALL IRON';
        $empresa4->direccion = 'ZARRA KALEA, 1';
        $empresa4->cPostal = '48001';
        $empresa4->poblacion = 'BILBAO';
        $empresa4->provincia = 'VIZCAYA';
        $empresa4->pais = 'ESPAÑA';
        $empresa4->telefonoFijo = '933933933';
        $empresa4->telefonoMovil = '666333222';
        $empresa4->email = 'hierros@hierros.com';
        $empresa4->password = Hash::make('12345678');
        $empresa4->ultimaConexion = Carbon::now('Europe/Madrid');
        $empresa4->activo = true;
        $empresa4->fechaAlta = '2023-01-01';
        $empresa4->created_at = '2023-01-01';
        $empresa4->updated_at = Carbon::now('Europe/Madrid');
//        $file4 = public_path('seed_images\logo4.jpg');
//        $path4 = Storage::disk('public')->putFile('images', $file4);
//        $empresa4->logotipo = $path4;
        $empresa4->save();
    }
}
