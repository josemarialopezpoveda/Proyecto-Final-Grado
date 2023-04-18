<?php

namespace App\Helpers;

// app/Helpers/Holidays.php

use Illuminate\Support\Carbon;

class Holidays
{
    public static function isHoliday($date): bool
    {
        // Convertir la fecha a un objeto Carbon
        $carbonDate = Carbon::parse($date);

        // Obtener el año de la fecha
        $year = $carbonDate->year;

        // Crear un array con las fechas de los días festivos por año
        $holidays = [
            $year . '-01-01', // 1 de enero
            $year . '-01-06', // 6 de enero
            $year . '-05-01', // 1 de mayo
            $year . '-08-15', // 15 de agosto
            $year . '-10-12', // 12 de octubre
            $year . '-11-01', // 1 de noviembre
            $year . '-12-06', // 6 de diciembre
            $year . '-12-08', // 8 de diciembre
            $year . '-12-25', // 25 de diciembre
        ];

        // Calcular la fecha de Viernes Santo usando la fórmula de Meeus/Jones/Butcher
        $a = $year % 19;
        $b = floor($year / 100);
        $c = $year % 100;
        $d = floor($b / 4);
        $e = $b % 4;
        $f = floor(($b + 8) / 25);
        $g = floor(($b - $f + 1) / 3);
        $h = (19 * $a + $b - $d - $g + 15) % 30;
        $i = floor($c / 4);
        $k = $c % 4;
        $l = (32 + 2 * $e + 2 * $i - $h - $k) % 7;
        $m = floor(($a + 11 * $h + 22 * $l) / 451);
        $month = floor(($h + $l - 7 * $m + 114) / 31);
        $day = ($h + $l - 7 * $m + 114) % 31 + 1;

        // Agregar la fecha de Viernes Santo al array de días festivos
        $viernes_santo = Carbon::createFromDate($year, $month, $day)->subDays(2);
        $holidays[] = $viernes_santo->format('Y-m-d');

        // Verificar si la fecha proporcionada es un día festivo
        return in_array($carbonDate->format('Y-m-d'), $holidays);
    }
}






