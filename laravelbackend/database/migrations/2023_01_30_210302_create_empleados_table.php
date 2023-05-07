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
            $table->foreignId('empresa_id')->comment('ID de la empresa a la que pertenece el empleado')->constrained()->cascadeOnDelete();
            $table->string('nif', 10)->unique()->comment('NIF del empleado');
            $table->string('nombre', 50)->comment('Nombre del empleado');
            $table->string('apellidos', 100)->comment('Apellidos del empleado');
            $table->string('direccion',100 )->comment('Dirección del empleado');
            $table->string('cPostal', 10)->comment('Código Postal del empleado');
            $table->string('poblacion', 100)->comment('Población del empleado');
            $table->string('provincia', 100)->comment('Provincia del empleado');
            $table->string('pais', 100)->default('España')->comment('País del empleado');
            $table->unsignedInteger('telefono')->comment('Teléfono del empleado');
            $table->date('fechaNacimiento')->comment('Fecha de nacimiento del empleado');
            $table->string('email', 191)->unique()->comment('Correo electrónico del empleado');
            $table->string('password', 255)->comment('Contraseña del empleado');
            $table->unsignedBigInteger('numSegSoc')->unique()->comment('Número de Seguridad Social del empleado');
            $table->string('fotografia',191)->nullable()->comment('Ruta de la fotografía del empleado');
            $table->dateTime('ultimaConexion')->comment('Fecha y hora de la última conexión del empleado');
            $table->boolean('activo')->default(true)->comment('Indicador de si el empleado está activo o no');
            $table->date('fechaAlta')->nullable()->comment('Fecha de alta del empleado');
            $table->date('fechaBaja')->nullable()->comment('Fecha de baja del empleado');
            $table->enum('tipoEmpleado', ['Administrador', 'Trabajador'])->default('Trabajador')->comment('Tipo de empleado (Administrador/Trabajador)');
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
