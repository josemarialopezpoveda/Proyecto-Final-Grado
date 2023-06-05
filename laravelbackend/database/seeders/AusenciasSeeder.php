<?php

namespace Database\Seeders;

use App\Models\Ausencia;
use App\Models\Empleado;
use Illuminate\Database\Seeder;

class AusenciasSeeder extends Seeder {
    public function run()
    {
        $empresaId = 1; // ID de la empresa específica

        $empleados = Empleado::where('empresa_id', $empresaId)->get();

        foreach ($empleados as $empleado) {
            Ausencia::factory()->create([
                'empleado_id' => $empleado->id,
            ]);
        }
    }
}

