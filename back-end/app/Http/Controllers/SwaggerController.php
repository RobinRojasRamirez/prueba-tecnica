<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="API de Gestión de Alumnos",
 *      description="API para la gestión de alumnos y autenticación en Laravel",
 *      @OA\Contact(
 *          email="soporte@ejemplo.com"
 *      ),
 *      @OA\License(
 *          name="MIT",
 *          url="https://opensource.org/licenses/MIT"
 *      )
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="Servidor API Principal"
 * )
 *
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT"
 * )
 */
class SwaggerController extends Controller
{
    // Este controlador solo contiene la configuración de Swagger y no necesita métodos.
}
