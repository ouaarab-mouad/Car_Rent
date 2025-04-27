<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Voiture;
use App\Models\Reservation;
use App\Models\Avis;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            AdminSeeder::class,
        ]);

        // Create users
        User::factory(10)->create();

        // Create cars
        Voiture::factory(20)->create();

        // Create reservations
        Reservation::factory(30)->create();

        // Create reviews
        Avis::factory(40)->create();
    }
}
