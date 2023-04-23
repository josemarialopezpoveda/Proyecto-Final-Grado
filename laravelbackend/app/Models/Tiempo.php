<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tiempo extends Model
{
    use HasFactory;

    protected $table = 'tiempos'; // Nombre de la tabla en la base de datos
    protected $fillable  = ['empleado_id', 'inicio', 'fin'];
    // Definir relación con el modelo Empleado
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
}
