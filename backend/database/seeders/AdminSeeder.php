<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Voiture;
use App\Models\Reservation;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Create admin user if it doesn't exist
        $admin = User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'nom' => 'Admin',
            'prenom' => 'User',
            'password' => Hash::make('admin123'),
            'phone' => '1234567890',
            'role' => 'administrateur',
            'role_status' => 'approved'
        ]);

        // Create a client user if it doesn't exist
        $client = User::firstOrCreate([
            'email' => 'client@example.com'
        ], [
            'nom' => 'Client',
            'prenom' => 'Test',
            'password' => Hash::make('client123'),
            'phone' => '0987654321',
            'role' => 'client',
            'role_status' => 'approved'
        ]);

        // Create some test cars associated with the admin
        for ($i = 0; $i < 5; $i++) {
            $voiture = Voiture::create([
                'marque' => fake()->randomElement(['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Volkswagen']),
                'modele' => fake()->word(),
                'categorie' => fake()->randomElement(['Compact', 'Sedan', 'SUV', 'Luxury', 'Sports']),
                'ville' => fake()->city(),
                'prix_par_jour' => fake()->numberBetween(50, 500),
                'disponible' => true,
                'conditions' => [
                    'carbur' => fake()->randomElement(['essence', 'diesel', 'électrique']),
                    'limite_km' => fake()->numberBetween(100, 500),
                    'age_minimum' => fake()->numberBetween(21, 30),
                    'permis_requis' => fake()->randomElement(['A', 'B', 'C'])
                ],
                'srcimg' => fake()->imageUrl(640, 480, 'cars'),
                'utilisateur_id' => $admin->id
            ]);

            // Create a reservation for each car
            $days = 7;
            $prixTotal = $voiture->prix_par_jour * $days;

            Reservation::create([
                'client_id' => $client->id,
                'loueur_id' => $admin->id,
                'voiture_id' => $voiture->id,
                'date_debut' => now(),
                'date_fin' => now()->addDays($days),
                'prix_total' => $prixTotal,
                'statut' => 'en_attente'
            ]);
        }
    }
}
