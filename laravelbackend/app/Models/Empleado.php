<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


/**
 *
 */
class Empleado extends Model {
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
        'numSegSoc',
        'fotografia',
        'ultimaConexion',
        'activo',
        'fechaAlta',
        'fechaBaja'
    ];

    protected $hidden = ['password'];
    /**
     * @return BelongsToMany
     */
//    public function turnos()
//    {
//        return $this->belongsToMany(Turno::class, 'empleados_turnos');
//    }
    public function turnos(): BelongsToMany
    {
        return $this->belongsToMany(Turno::class, 'empleados_turnos', 'empleado_id', 'turno_id')
            ->withPivot('id', 'fechaInicioTurno', 'fechaFinTurno', 'activo'); // Agrega los campos de la tabla pivot
    }

    public function tiempos(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Tiempo::class);
    }

    public function casos(): BelongsToMany
    {
        return $this->belongsToMany(Caso::class, 'casos_empleados');
    }

    public function ausencias(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Ausencia::class);
    }
}
