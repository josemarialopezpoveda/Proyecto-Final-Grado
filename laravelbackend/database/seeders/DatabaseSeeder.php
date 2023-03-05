<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Turno;
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
            TiemposTableSeeder::class

        ]);
    }
}
