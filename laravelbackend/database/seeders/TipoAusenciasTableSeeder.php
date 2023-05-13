<?php

namespace Database\Seeders;

use App\Models\Empresa;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoAusenciasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $empresas = Empresa::all();
        foreach ($empresas as $empresa) {
            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'BAJA',
                'descripcion' => "BAJA POR ENFERMEDAD COMÚN",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'BAJA',
                'descripcion' => "BAJA POR ACCIDENTE LABORAL",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'BAJA',
                'descripcion' => "BAJA POR MATERNIDAD",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'BAJA',
                'descripcion' => "BAJA POR PATERNIDAD",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'BAJA',
                'descripcion' => "BAJA POR RIESGO DURANTE EL EMBARAZO",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'BAJA',
                'descripcion' => "BAJA POR ENFERMEDAD PROFESIONAL",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'AUSENCIA',
                'descripcion' => "AUSENCIA POR LICENCIA SIN SUELDO",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'AUSENCIA',
                'descripcion' => "AUSENCIA POR PERMISO REMUNERADO",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'AUSENCIA',
                'descripcion' => "OTRAS AUSENCIAS",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'VACACIONES',
                'descripcion' => "VACACIONES EMPLEADO",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            DB::table('tipoausencias')->insert([
                'empresa_id'=> $empresa->id,
                'tipo' => 'VACACIONES',
                'descripcion' => "VACACIONES EMPRESA",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
