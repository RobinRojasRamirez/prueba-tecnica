<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alumno extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'alumnos';

    protected $fillable = [
        'nombre',
        'fecha_nacimiento',
        'nombre_padre',
        'nombre_madre',
        'grado',
        'seccion',
        'fecha_ingreso',
    ];

    protected $dates = ['deleted_at']; // Para habilitar el manejo de fechas en el borrado lógico
}
