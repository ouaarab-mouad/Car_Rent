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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'requested_role')) {
                $table->string('requested_role')->nullable();
            }
            if (!Schema::hasColumn('users', 'role_status')) {
                $table->enum('role_status', ['pending', 'approved', 'rejected'])->default('pending');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'requested_role')) {
                $table->dropColumn('requested_role');
            }
            if (Schema::hasColumn('users', 'role_status')) {
                $table->dropColumn('role_status');
            }
        });
    }
};
