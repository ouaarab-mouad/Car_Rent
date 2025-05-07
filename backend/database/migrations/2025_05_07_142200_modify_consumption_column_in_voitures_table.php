<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('voitures', function (Blueprint $table) {
            $table->decimal('consumption-per-km', 8, 2)->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('voitures', function (Blueprint $table) {
            $table->decimal('consumption-per-km', 5, 2)->nullable()->change();
        });
    }
};
