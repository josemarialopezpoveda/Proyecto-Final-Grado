<?php

namespace Database\Seeders;

use App\Models\Caso;
use App\Models\Empleado;
use App\Models\Mensaje;
use Illuminate\Database\Seeder;

class MensajeSeeder extends Seeder {
    public function run()
    {
        $casos = Caso::whereNotIn('id', [1])->get();

        foreach ($casos as $caso) {
            Mensaje::factory()
                ->create([
                    'empresa_id' => $caso->empleado->empresa_id,
                    'casos_id' => $caso->id,
                    'emisor' => $caso->empleado_id,
                    'receptor' => $this->getRandomReceptor($caso->empleado->empresa_id, $caso->empleado_id),
                    'horaEnvio' => now(),
                ]);
        }
    }

    private function getRandomReceptor($empresaId, $empleadoId)
    {
        return Empleado::where('empresa_id', $empresaId)
            ->where('id', '!=', $empleadoId)
            ->inRandomOrder()
            ->first()
            ->id;
    }
}
