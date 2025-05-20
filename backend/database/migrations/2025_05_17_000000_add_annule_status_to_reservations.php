<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE reservations MODIFY statut ENUM('disponible', 'non_disponible', 'en_attente', 'acceptée', 'refusée', 'annulé') DEFAULT 'en_attente'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE reservations MODIFY statut ENUM('disponible', 'non_disponible', 'en_attente', 'acceptée', 'refusée') DEFAULT 'en_attente'");
    }
};
