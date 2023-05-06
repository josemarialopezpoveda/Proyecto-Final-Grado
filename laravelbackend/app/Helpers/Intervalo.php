<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class Intervalo {
    public $inicio;
    public $fin;

    public function __construct($inicio, $fin) {
        $this->inicio = $inicio;
        $this->fin = $fin;
    }

    public function dentroDe($otroIntervalo):bool
    {
        // Caso 1: el intervalo de las horas trabajadas contiene al intervalo de las horas del turno
        if ($this->inicio >= $otroIntervalo->inicio && $this->fin <= $otroIntervalo->fin) {
            return true;
        }
        // Caso 2: las horas del turnos contiene a las horas del intervalo
        elseif ($this->inicio <= $otroIntervalo->inicio && $this->fin >= $otroIntervalo->fin) {
            return true;
        }
        // Caso 3: La hora de inicio del trabajo es menor que la hora de inicio del turno y la hora del fin del trabajo es menor que la hora del fin del turno.
        elseif ($this->inicio < $otroIntervalo->inicio && $this->fin < $otroIntervalo->fin && $this->fin > $otroIntervalo->inicio) {
            return true;
        }
        // Caso 4: la hora de inicio del trabajo es mayor que la hora de inicio del turno y la hora de fin del trabajo es mayor que la hora del fin del turno
        elseif ($this->inicio > $otroIntervalo->inicio && $this->fin > $otroIntervalo->fin && $this->inicio < $otroIntervalo->fin) {
            return true;
        }
        // El intervalo de las horas trabajadas no está dentro del rango del turno
        else {
            return false;
        }
    }

    public static function sumaHorasIntervalos($dia): string
    {
        $intervalos = [
            [$dia->horaInicioM, $dia->horaFinM],
            [$dia->horaInicioT, $dia->horaFinT],
            [$dia->horaInicioN, $dia->horaFinN]
        ];
        $segundosTotales = 0;
        foreach ($intervalos as $intervalo) {
            $inicio = Carbon::parse($intervalo[0]);
            $fin = Carbon::parse($intervalo[1]);
            $segundosTotales += $fin->diffInSeconds($inicio);
        }
        return gmdate('H:i:s', $segundosTotales);
    }

}

