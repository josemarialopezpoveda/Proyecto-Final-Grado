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
            $table->string('cif')->unique();
            $table->string('razonSocial');
            $table->string('nombreComercial');
            $table->string('direccion');
            $table->string('cPostal');
            $table->string('poblacion');
            $table->string('provincia');
            $table->string('pais')->default('España');
            $table->integer('telefonoFijo')->unique();
            $table->integer('telefonoMovil')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('logotipo')->nullable();
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