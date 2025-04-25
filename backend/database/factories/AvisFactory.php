<?php

namespace Database\Factories;

use App\Models\Avis;
use App\Models\User;
use App\Models\Voiture;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class AvisFactory extends Factory
{
    protected $model = Avis::class;

    public function definition()
    {
        return [
            'loueur_id' => User::factory()->state(['role' => 'loueur']),
            'client_id' => User::factory()->state(['role' => 'client']),
            'description' => $this->faker->paragraph,
            'etoiles' => $this->faker->numberBetween(1, 5),
            'created_at' => $this->faker->dateTimeThisYear,
        ];
    }
}
