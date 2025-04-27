<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Voiture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+1 month');
        $endDate = fake()->dateTimeBetween($startDate, '+1 month');

        return [
            'client_id' => User::factory(),
            'loueur_id' => User::factory(),
            'voiture_id' => Voiture::factory(),
            'date_debut' => $startDate,
            'date_fin' => $endDate,
            'prix_total' => fake()->numberBetween(100, 1000),
            'statut' => fake()->randomElement(['disponible', 'non_disponible', 'en_attente'])
        ];
    }
}
