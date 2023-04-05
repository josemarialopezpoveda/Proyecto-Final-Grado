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
            //TiemposTableSeeder::class,
            EmpleadosTurnosTableSeeder::class,
            CasosTableSeeder::class,
            CasosEmpleadosTableSeeder::class,
            MensajesTableSeeder::class

        ]);
        Empresa::factory(10)->create();
        Empleado::factory(50)->create();
        /* $empleado=Empleado::factory(3)->hasTiempos(3,function(array $attributes,Empleado $empleado){
            return ['empleado_id'=>$empleado->id];
        })->create(); */
        //Tiempo::factory(42)->create();
        for ($i = 1; $i < 4; $i++) {
            echo "Llamada al factory " . "\n";
            Tiempo::factory(3, ['empleado_id' => $i])->create();
        }

        //$this->call(ActualizarFechaSeeder::class);
    }
}