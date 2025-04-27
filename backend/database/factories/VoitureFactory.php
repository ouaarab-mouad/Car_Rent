<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voiture>
 */
class VoitureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'marque' => fake()->randomElement(['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Volkswagen']),
            'modele' => fake()->word(),
            'categorie' => fake()->randomElement(['Compact', 'Sedan', 'SUV', 'Luxury', 'Sports']),
            'ville' => fake()->city(),
            'prix_par_jour' => fake()->numberBetween(50, 500),
            'disponible' => true,
            'conditions' => [
                'carburant' => fake()->randomElement(['essence', 'diesel', 'électrique']),
                'limite_km' => fake()->numberBetween(100, 500),
                'age_minimum' => fake()->numberBetween(21, 30),
                'permis_requis' => fake()->randomElement(['A', 'B', 'C'])
            ],
            'srcimg' => fake()->imageUrl(640, 480, 'cars'),
            'utilisateur_id' => User::factory(), // This will create a new user if none is provided
        ];
    }
}
