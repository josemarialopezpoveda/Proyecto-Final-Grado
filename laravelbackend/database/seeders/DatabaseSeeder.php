<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Caso;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tiempo;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
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
            CasosTableSeeder::class,
            CasosEmpleadosTableSeeder::class,
        ]);


        Empresa::factory(10)->create();
        Empleado::factory(100)->create();
        Tiempo::factory(103)->create();
        Caso::factory(20)->create();

        $this->call([
            MensajesTableSeeder::class,
            EmpleadosTurnosTableSeeder::class,
            TiemposTableSeeder::class,
            AusenciasSeeder::class,
            DeleteEmployeeTimesSeeder::class,
            MensajeSeeder::class,
        ]);
    }
}
