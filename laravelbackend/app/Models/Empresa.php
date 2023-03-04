<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


/**
 *
 */
class Empresa extends Model {

    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * @var bool
     */
    public $timestamps = false;
    /**
     * @var string
     */
    protected $table = 'empresas';
    /**
     * @var string[]
     */
    protected $fillable = [
        'cif',
        'razonSocial',
        'nombreComercial',
        'direccion',
        'cPostal',
        'poblacion',
        'provincia',
        'pais',
        'telefonoFijo',
        'telefonoMovil',
        'email',
        'password',
        'logotipo',
        'ultimaConexion',
        'activo',
        'fechaAlta',
        'fechaBaja'
    ];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function empleados()
    {
        return $this->hasMany(Empleado::class);
    }

}
