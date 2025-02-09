<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alumno>
 */
class AlumnoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->name(),
            'fecha_nacimiento' => $this->faker->date('Y-m-d', '2015-01-01'),
            'nombre_padre' => $this->faker->name('male'),
            'nombre_madre' => $this->faker->name('female'),
            'grado' => $this->faker->randomElement(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']),
            'seccion' => $this->faker->randomElement(['A', 'B', 'C']),
            'fecha_ingreso' => $this->faker->date('Y-m-d', '2023-01-01'),
        ];
    }
}
