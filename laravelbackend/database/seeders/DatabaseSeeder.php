<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Empleado;
use App\Models\Turno;
use App\Models\Empresa;
use App\Models\Tiempo;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {



        $this->call([
            EmpresasTableSeeder::class,
            EmpleadosTableSeeder::class,
            TurnosTableSeeder::class,
            DiasTableSeeder::class,
            TipoAusenciasTableSeeder::class,
            AusenciasTableSeeder::class,
            TiemposTableSeeder::class,
            EmpleadosTurnosTableSeeder::class

        ]);
        Empresa::factory(10)->create();
        Empleado::factory(10)->create();
        Tiempo::factory(42)->create();
    }
}
