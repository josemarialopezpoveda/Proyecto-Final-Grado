<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    use HasFactory;

    public function casos()
    {
        return $this->belongsTo(Caso::class);
    }

    public function empresas()
    {
        return $this->belongsTo(Mensaje::class);
    }
}
