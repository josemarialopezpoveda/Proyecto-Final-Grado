<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('cif', 10)->unique(); // Tamaño máximo de 10 caracteres
            $table->string('razonSocial', 255); // Tamaño máximo de 255 caracteres
            $table->string('nombreComercial', 255); // Tamaño máximo de 255 caracteres
            $table->string('direccion', 255); // Tamaño máximo de 255 caracteres
            $table->string('cPostal', 10); // Tamaño máximo de 10 caracteres
            $table->string('poblacion', 255); // Tamaño máximo de 255 caracteres
            $table->string('provincia', 255); // Tamaño máximo de 255 caracteres
            $table->string('pais', 255)->default('España'); // Tamaño máximo de 255 caracteres
            $table->string('telefonoFijo', 20)->unique(); // Tamaño máximo de 20 caracteres
            $table->string('telefonoMovil', 20)->unique(); // Tamaño máximo de 20 caracteres
            $table->string('email', 191)->unique(); // Tamaño máximo de 191 caracteres
            $table->string('password', 191);
            $table->string('logotipo', 191)->nullable();
            $table->dateTime('ultimaConexion');
            $table->boolean('activo')->default(false);
            $table->date('fechaAlta')->nullable();
            $table->date('fechaBaja')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('empresas');
    }
};
