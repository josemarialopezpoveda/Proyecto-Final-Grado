<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('empresa_id')->constrained()->cascadeOnDelete();
            $table->string('nif')->unique();
            $table->string('nombre');
            $table->string('apellidos');
            $table->string('direccion');
            $table->string('cPostal');
            $table->string('poblacion');
            $table->string('provincia');
            $table->string('pais')->default('España');
            $table->integer('telefono');
            $table->date('fechaNacimiento');
            $table->string('email')->unique();
            $table->string('password');
            $table->bigInteger('numSegSoc')->unique();
            $table->string('fotografia')->nullable();
            $table->dateTime('ultimaConexion');
            $table->boolean('activo')->default(true);
            $table->date('fechaAlta')->nullable();
            $table->date('fechaBaja')->nullable();
            $table->enum('tipoEmpleado', ['Administrador', 'Trabajador'])->default('Trabajador');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empleados');
    }
};