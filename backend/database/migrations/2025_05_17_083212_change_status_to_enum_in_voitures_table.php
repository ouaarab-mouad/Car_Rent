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
        // First, modify the column to accept the new ENUM values
        DB::statement("ALTER TABLE voitures MODIFY COLUMN status ENUM('disponible', 'non_disponible', 'en_location', 'en_maintenance', 'reserve') NOT NULL DEFAULT 'disponible'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to string type
        DB::statement("ALTER TABLE voitures MODIFY COLUMN status VARCHAR(255) NOT NULL DEFAULT 'disponible'");
    }
};
