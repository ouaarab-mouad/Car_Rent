<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\User;
use App\Models\Voiture;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition()
    {
        return [
            'client_id' => User::factory()->state(['role' => 'client']),
            'loueur_id' => User::factory()->state(['role' => 'loueur']),
            'publication_id' => Voiture::factory(),
            'date_debut' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'date_fin' => function (array $attributes) {
                return $this->faker->dateTimeBetween($attributes['date_debut'], '+7 days');
            },
            'statut' => $this->faker->randomElement(['en_attente', 'disponible', 'non_disponible']),
        ];
    }
}
