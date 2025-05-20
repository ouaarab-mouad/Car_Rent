<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('avis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loueur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->text('description');
            $table->integer('etoiles')->default(0);
            $table->timestamps();
            $table->unique(['loueur_id', 'client_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('avis');
    }
};
