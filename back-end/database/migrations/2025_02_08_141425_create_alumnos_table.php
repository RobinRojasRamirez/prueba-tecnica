<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->date('fecha_nacimiento');
            $table->string('nombre_padre');
            $table->string('nombre_madre');
            $table->string('grado');
            $table->string('seccion');
            $table->date('fecha_ingreso');
            $table->timestamps(); // Agrega created_at y updated_at
            $table->softDeletes(); // Agrega deleted_at para el borrado lógico
        });
    }

    public function down()
    {
        Schema::dropIfExists('alumnos');
    }
};
