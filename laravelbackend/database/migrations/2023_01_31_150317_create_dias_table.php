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
        Schema::create('dias', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('turno_id')->constrained()->cascadeOnDelete();
            $table->integer('diaSemana');
            $table->time('horaInicioM');
            $table->time('horaFinM');
            $table->time('horaInicioT');
            $table->time('horaFinT');
            $table->time('horaInicioN');
            $table->time('horaFinN');
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
        Schema::dropIfExists('dias');
    }
};
