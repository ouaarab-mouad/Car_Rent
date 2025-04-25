<?php

namespace Database\Factories;

use App\Models\Voiture;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class VoitureFactory extends Factory
{
    protected $model = Voiture::class;

    public function definition()
    {
        return [
            'utilisateur_id' => User::factory(),
            'nom' => $this->faker->word,
            'modele' => $this->faker->word,
            'marque' => $this->faker->randomElement(['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes']),
            'conditions' => [
                'carburant' => $this->faker->randomElement(['essence', 'diesel', 'électrique']),
                'limite_km' => $this->faker->numberBetween(100, 500),
                'age_minimum' => $this->faker->numberBetween(21, 30),
                'permis_requis' => $this->faker->randomElement(['A', 'B', 'C'])
            ]
        ];
    }
}
