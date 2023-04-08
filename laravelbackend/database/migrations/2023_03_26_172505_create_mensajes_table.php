<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mensajes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('empresa_id')->constrained();
            $table->foreignId('casos_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger ('emisor');
            $table->unsignedBigInteger ('receptor');
            $table->text('mensaje');
            $table->dateTime('horaEnvio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes');
    }
};
