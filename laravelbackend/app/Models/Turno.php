<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;


//    public function empleados()
//    {
//        return $this->belongsToMany(Empleado::class, 'empleados_turnos');
//    }

    public function empleados()
    {
        return $this->belongsToMany(Empleado::class, 'empleados_turnos', 'turno_id', 'empleado_id')
            ->withPivot('fechaInicioTurno', 'fechaFinTurno', 'activo'); // Agrega los campos de la tabla pivot
    }

    public function dias()
    {
        return $this->hasMany(Dia::class);
    }
}
