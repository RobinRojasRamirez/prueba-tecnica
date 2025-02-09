<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Alumno;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Crear 10 usuarios falsos
        User::factory(10)->create();

        // Crear 50 alumnos falsos
        Alumno::factory(50)->create();
    }
}
