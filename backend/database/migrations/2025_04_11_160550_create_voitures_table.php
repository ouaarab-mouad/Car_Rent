<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('users')->onDelete('cascade');
            $table->string('modele');
            $table->string('marque');
            $table->string('categorie')->nullable();
            $table->string('consumption-per-km')->nullable();
            $table->string('ville');
            $table->integer('prix_par_jour');
            $table->boolean('disponible')->default(true);
            $table->json('conditions')->nullable();
            $table->string('srcimg')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('voitures');
    }
};
