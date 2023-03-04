<?php

namespace Database\Seeders;

use App\Models\Empresa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class EmpresasTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
        $empresa1->ultimaConexion = Carbon::now();
        $empresa1->activo = true;
        $empresa1->fechaAlta = Carbon::now();
        $empresa1->created_at = Carbon::now();
        $empresa1->updated_at = Carbon::now();
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
        $empresa2->ultimaConexion = '2023-02-05 00:00:00';
        $empresa2->activo = true;
        $empresa2->fechaAlta = Carbon::now();
        $empresa2->created_at = Carbon::now();
        $empresa2->updated_at = Carbon::now();
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
        $empresa3->ultimaConexion = Carbon::now();
        $empresa3->activo = true;
        $empresa3->fechaAlta = Carbon::now();
        $empresa3->created_at = Carbon::now();
        $empresa3->updated_at = Carbon::now();
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
        $empresa4->ultimaConexion = Carbon::now();
        $empresa4->activo = true;
        $empresa4->fechaAlta = Carbon::now();
        $empresa4->created_at = Carbon::now();
        $empresa4->updated_at = Carbon::now();
        $empresa4->save();

    }
}
