<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'mot_de_passe' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'numero_telephone' => $this->faker->phoneNumber,
            'role' => $this->faker->randomElement(['administrateur', 'loueur', 'utilisateur']),
            'autorisation_location' => $this->faker->randomElement(['autorisé', 'non_autorisé']),
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
            'sms_code' => $this->faker->randomNumber(6),
            'sms_code_expires_at' => now()->addMinutes(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
