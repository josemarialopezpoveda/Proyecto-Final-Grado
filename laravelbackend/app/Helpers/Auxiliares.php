<?php

namespace App\Helpers;

use App\Models\Dia;
use App\Models\Empleado;
use App\Models\Empresa;
use App\Models\Tiempo;
use Illuminate\Support\Carbon;

class Auxiliares {

    public static function isTurno($horaInicioTurno): bool
    {
        return $horaInicioTurno != '00:00:00';
    }

    /**
     * Determina si el empleado trabajó dentro del turno correspondiente.
     *
     * @param string $horaEntradaEmpleado Hora de entrada del empleado en formato HH:mm:ss.
     * @param string $horaSalidaEmpleado Hora de salida del empleado en formato HH:mm:ss.
     * @return bool                        true si el empleado trabajó dentro del turno, false si no.
     */
    public static function empleadoTrabajoDentroDelTurno(
        $turnoInicio,
        $turnoFin,
        $horaEntradaEmpleado,
        $horaSalidaEmpleado
    ): bool {
        $horaInicioTrabajo = Carbon::parse($turnoInicio)->format('H:i:s');
        $horaFinTrabajo = Carbon::parse($turnoFin)->format('H:i:s');
        $intervaloTrabajo = new Intervalo($horaEntradaEmpleado, $horaSalidaEmpleado);
        $intervaloTurno = new Intervalo($horaInicioTrabajo, $horaFinTrabajo);

        return $intervaloTrabajo->dentroDe($intervaloTurno);
    }

    public static function obtenerTiempos($turno, $segundos)
    {
        $turno_con_segundos = $turno;
        $turno_con_segundos['horasTrabajadas'] = gmdate("H:i:s", $segundos);

        $horasJornada = Carbon::parse($turno_con_segundos['horasJornada']);
        $horasTrabajadas = Carbon::parse($turno_con_segundos['horasTrabajadas']);
        $diferencia = $horasTrabajadas->diff($horasJornada);

        $diferenciaSegundos = $diferencia->invert == 0
            ? $diferencia->s + $diferencia->i * 60 + $diferencia->h * 3600
            : -($diferencia->s + $diferencia->i * 60 + $diferencia->h * 3600);

        if ($diferenciaSegundos > 0) {
            // El empleado trabajó menos horas de las que debía
            $retrasoDia = true;
            $adelantoDia = false;
            $signo = '-';
        } elseif ($diferenciaSegundos < 0) {
            // El empleado trabajó más horas de las que debía
            $retrasoDia = false;
            $adelantoDia = true;
            $signo = '';
        } else {
            // El empleado trabajó las horas que debía
            $retrasoDia = false;
            $adelantoDia = false;
            $signo = '';
        }
        $diferenciaFormateadaDia = $signo . gmdate('H:i:s', abs($diferenciaSegundos));
        if ($diferenciaSegundos < 0) {
            $turno_con_segundos['horasFaltantes'] = "00:00:00";
            $turno_con_segundos['horasExtras'] = $diferenciaFormateadaDia;
        } else {
            if ($diferenciaSegundos > 0) {
                $turno_con_segundos['horasFaltantes'] = $diferenciaFormateadaDia;
                $turno_con_segundos['horasExtras'] = "00:00:00";
            } else {
                $turno_con_segundos['horasFaltantes'] = "00:00:00";
                $turno_con_segundos['horasExtras'] = "00:00:00";
            }
        }
        return $turno_con_segundos;
    }

    /**
     * Verifica si un usuario tiene autorización para acceder a la información de un empleado.
     *
     * El propio empleado ($empleadoId).
     * Un administrador de la empresa del empleado.
     * La propia empresa del empleado.
     *
     * @param int $empleadoId Id del empleado a verificar.
     * @param mixed $user Usuario que solicita la información (puede ser de tipo Empleado o Empresa).
     *
     * @return bool|array Si el usuario tiene autorización, retorna true. Si no tiene autorización, retorna un arreglo con un mensaje de error.
     */
    public static function verificarAutorizacionEmpleado($empleadoId, $user)
    {
        // Busca el empleado en la base de datos
        $empleado = Empleado::find($empleadoId);
        if (!$empleado) {
            // Si no se encuentra el empleado, retorna un mensaje de error
            return ['message' => 'Empleado no existe.'];
        }

        // Busca la empresa a la que pertenece el empleado
        $empresa = Empresa::find($empleado->empresa_id);
        if (!$empresa) {
            // Si no se encuentra la empresa del empleado, retorna un mensaje de error
            return ['message' => 'Empresa del empleado no existe.'];
        }

        // Si el usuario que solicita la información es de tipo Empresa y tiene el mismo id que la empresa del empleado, tiene autorización
        if ($user instanceof Empresa && $user->id == $empleado->empresa_id) {
            return true;
        }

        // Si el usuario que solicita la información es de tipo Empleado y pertenece a la misma empresa del empleado
        if ($user instanceof Empleado && $user->empresa_id == $empleado->empresa_id) {
            // Si el tipo de empleado es Administrador o el id del usuario es igual al id del empleado, tiene autorización
            if ($user->tipoEmpleado == "Administrador" || $user->id == $empleadoId) {
                return true;
            } else {
                // Si el usuario no es Administrador ni es el mismo empleado, no tiene autorización
                return ['message' => 'No estás autorizado.'];
            }
        }

        // Si el usuario no pertenece a la misma empresa del empleado, no tiene autorización
        return ['message' => 'El empleado no pertenece a la empresa del usuario autenticado.'];
    }


    /**
     * Verifica si un usuario tiene autorización para acceder a recursos de una empresa.
     * Devuelve el id de la empresa si el usuario tiene autorización, o una respuesta HTTP
     * con código 404 si no tiene autorización.
     *
     * @param mixed $user El usuario a verificar.
     * @return mixed El id de la empresa o una respuesta HTTP con código 404.
     */
    public static function verificarAutorizacionEmpresa($user)
    {
        if ($user->tipoEmpleado != 'Trabajador') {
            if ($user instanceof Empresa) {
                $empresaId = $user->getKey();
            } elseif ($user->tipoEmpleado == 'Administrador') {
                $empresaId = $user->empresa_id;
            }
            return $empresaId;
        } else {
            return ['message' => 'No estás autorizado.'];
        }
    }

    public static function determinarTurno ($dia, $horaLlegada)
    {

        $horaInicioM = Carbon::createFromFormat('H:i:s', $dia->horaInicioM);
        $horaFinM = Carbon::createFromFormat('H:i:s', $dia->horaFinM);
        $horaInicioT = Carbon::createFromFormat('H:i:s', $dia->horaInicioT);
        $horaFinT = Carbon::createFromFormat('H:i:s', $dia->horaFinT);

        // Comprobar si la hora de llegada está dentro del primer turno
        if ($horaLlegada->between($horaInicioM, $horaFinM)) {
            // Asignar el primer turno del día
            $horaInicio = $horaInicioM;
        }
        // Comprobar si la hora de llegada está dentro del segundo turno
        elseif ($horaLlegada->between($horaInicioT, $horaFinT)) {
            // Asignar el segundo turno del día
            $horaInicio = $horaInicioT;
        }
        // Comprobar si la hora de llegada es antes del primer turno
        elseif ($horaLlegada->lt($horaInicioM)) {
            // Asignar el primer turno del día
            $horaInicio = $horaInicioM;
        }
        // Comprobar si la hora de llegada es después del segundo turno
        elseif ($horaLlegada->gt($horaFinT)) {
            // Asignar el último turno del día
            $horaInicio = $horaInicioT;
        }
        // Si la hora de llegada está entre los dos turnos, asignar el turno de tarde
        else {
            $horaInicio = $horaInicioT;
        }

        return $horaInicio;

    }

}
