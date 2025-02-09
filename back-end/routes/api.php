<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});

// Endpoints de Alumnos
Route::middleware('auth:api')->prefix('alumnos')->group(function () {
    Route::post('/', [AlumnoController::class, 'store']); // Registrar alumno
    Route::get('/grado/{grado}', [AlumnoController::class, 'showByGrado']); // Obtener alumnos por grado
    Route::post('/list', [AlumnoController::class, 'listAlumnos']); // Listado paginado con filtros
    Route::get('/{id}', [AlumnoController::class, 'showById']); // Obtener alumno por ID
    Route::put('/{id}', [AlumnoController::class, 'updateAlumno']); // Actualizar alumno
    Route::delete('/{id}', [AlumnoController::class, 'deleteAlumno']); // Borrar alumno (borrado lógico)
});