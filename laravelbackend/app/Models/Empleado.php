<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


/**
 *
 */
class Empleado extends Model
{
    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * @var bool
     */
    public $timestamps = false;
    /**
     * @var string
     */
    protected $table = 'empleados';
    /**
     * @var string[]
     */
    protected $fillable = [
        'empresa_id',
        'nif',
        'nombre',
        'apellidos',
        'direccion',
        'cPostal',
        'poblacion',
        'provincia',
        'pais',
        'telefono',
        'fechaNacimiento',
        'email',
        'password',
        'numSegSoc',
        'fotografia',
        'ultimaConexion',
        'activo',
        'fechaAlta',
        'fechaBaja'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
//    public function turnos()
//    {
//        return $this->belongsToMany(Turno::class, 'empleados_turnos');
//    }
    public function turnos()
    {
        return $this->belongsToMany(Turno::class, 'empleados_turnos', 'empleado_id', 'turno_id')
            ->withPivot('fechaInicioTurno', 'fechaFinTurno', 'activo'); // Agrega los campos de la tabla pivot
    }



    public function tiempos()
    {
        return $this->hasMany(Tiempo::class);
    }
}
