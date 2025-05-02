<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Avis>
 */
class AvisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'loueur_id' => User::factory(),
            'client_id' => User::factory(),
            'description' => fake()->paragraph(),
            'etoiles' => fake()->numberBetween(1, 5)
        ];
    }
}
