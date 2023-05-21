<?php

namespace Database\Seeders;

use App\Models\Empleado;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmpleadosTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $empleado2 = new Empleado;
        $empleado2->empresa_id = 1;
        $empleado2->nif = "93930164G";
        $empleado2->nombre = "VICTOR";
        $empleado2->apellidos = "MONTOYA";
        $empleado2->direccion = "VIEJA, 125";
        $empleado2->cPostal = "03610";
        $empleado2->poblacion = "PETRER";
        $empleado2->provincia = "ALICANTE";
        $empleado2->pais = "ESPAÑA";
        $empleado2->telefono = 666777787;
        $empleado2->fechaNacimiento = "1980-01-01";
        $empleado2->email = "victor@gmail.com";
        $empleado2->password = Hash::make('12345678');
        $empleado2->numSegSoc = 512150137625;
        $empleado2->ultimaConexion = Carbon::now('Europe/Madrid');
        $empleado2->activo = 1;
        $empleado2->fechaAlta = '2023-01-02';
        $empleado2->tipoEmpleado = "Administrador";
        $empleado2->created_at = '2023-01-01';
        $empleado2->updated_at = Carbon::now('Europe/Madrid');
        $empleado2->save();

        
        $empleado1 = new Empleado;
        $empleado1->empresa_id = 1;
        $empleado1->nif = "46967988X";
        $empleado1->nombre = "JOKIN";
        $empleado1->apellidos = "KALPENA";
        $empleado1->direccion = "SOL, 25";
        $empleado1->cPostal = "03600";
        $empleado1->poblacion = "ELDA";
        $empleado1->provincia = "ALICANTE";
        $empleado1->pais = "ESPAÑA";
        $empleado1->telefono = 666777788;
        $empleado1->fechaNacimiento = "1980-01-01";
        $empleado1->email = "jokin@gmail.com";
        $empleado1->password = Hash::make('12345678');
        $empleado1->numSegSoc = 373310065271;
        $empleado1->ultimaConexion = Carbon::now('Europe/Madrid');
        $empleado1->activo = 1;
        $empleado1->fechaAlta = '2023-01-02';
        $empleado1->tipoEmpleado = "Trabajador";
        $empleado1->created_at = '2023-01-01';
        $empleado1->updated_at = Carbon::now('Europe/Madrid');
        $empleado1->save();

        $empleado3 = new Empleado;
        $empleado3->empresa_id = 2;
        $empleado3->nif = "58903889S";
        $empleado3->nombre = "JOSE MARIA";
        $empleado3->apellidos = "LOPEZ";
        $empleado3->direccion = "JARDINES, 1";
        $empleado3->cPostal = "03600";
        $empleado3->poblacion = "ELDA";
        $empleado3->provincia = "ALICANTE";
        $empleado3->pais = "ESPAÑA";
        $empleado3->telefono = 666777587;
        $empleado3->fechaNacimiento = "1999-01-01";
        $empleado3->email = "josemaria@gmail.com";
        $empleado3->password = Hash::make('12345678');
        $empleado3->numSegSoc = 243140720665;
        $empleado3->ultimaConexion = Carbon::now('Europe/Madrid');
        $empleado3->activo = 1;
        $empleado3->fechaAlta = '2023-01-02';
        $empleado3->tipoEmpleado = "Administrador";
        $empleado3->created_at = '2023-01-01';
        $empleado3->updated_at = Carbon::now('Europe/Madrid');
        $empleado3->save();
    }
}
