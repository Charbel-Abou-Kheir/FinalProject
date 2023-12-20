<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->name(),
            'blood_type' => fake()->bloodType(),
            'status' => 'Urgent',
            'contact_info' => fake()->randomDigit(8),
            'description' => fake()->paragraph(4),
        ];
    }
}
//fake()->word()

