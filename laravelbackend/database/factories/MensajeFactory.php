<?php

namespace Database\Factories;

use App\Models\Caso;
use App\Models\Empleado;
use Illuminate\Database\Eloquent\Factories\Factory;

class MensajeFactory extends Factory {

    public function definition()
    {
        $caso = Caso::inRandomOrder()->first();
        $empresaId = $caso->empleado->empresa_id;
        $empleadoId = $caso->empleado_id;

        // Obtener todos los empleados de la empresa excepto el empleado actual
        $receptores = Empleado::where('empresa_id', $empresaId)
            ->where('id', '!=', $empleadoId)
            ->pluck('id');

        $receptorId = $receptores->random();
        $textoMensaje = $this->faker->paragraphs(2, true); // Generar un párrafo de texto

        return [
            'empresa_id' => $empresaId,
            'casos_id' => $caso->id,
            'emisor' => $empleadoId,
            'receptor' => $receptorId,
            'mensaje' => $textoMensaje,
            'horaEnvio' => now(),
        ];
    }
}

