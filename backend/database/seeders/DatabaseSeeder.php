<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        // Create Admin
        User::create([
            'nom' => 'Admin',
            'prenom' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'phone' => '0612345678',
            'role' => 'administrateur'
        ]);

        // Create Loueur
        User::create([
            'nom' => 'Loueur',
            'prenom' => 'Test',
            'email' => 'loueur@example.com',
            'password' => Hash::make('password'),
            'phone' => '0623456789',
            'role' => 'loueur'
        ]);

        // Create Client
        User::create([
            'nom' => 'Client',
            'prenom' => 'Test',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'phone' => '0634567890',
            'role' => 'client'
        ]);
    }
}
