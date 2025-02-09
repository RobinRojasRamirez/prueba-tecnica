<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alumno;

/**
 * Controlador para gestionar alumnos.
 *
 * Proporciona endpoints para registrar y consultar alumnos en la base de datos.
 *
 * @category Controlador
 * @package  App\Http\Controllers
 * @author   Tu Nombre
 * @license  MIT https://opensource.org/licenses/MIT
 * @link     https://tu-api-documentation.com
 */
class AlumnoController extends Controller
{
    /**
     * Constructor del controlador.
     *
     * Aplica el middleware `auth:api` para proteger los endpoints.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api'); // Protegemos la API con autenticación JWT
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'nombre_padre' => 'required|string|max:255',
            'nombre_madre' => 'required|string|max:255',
            'grado' => 'required|string|max:255',
            'seccion' => 'required|string|max:255',
            'fecha_ingreso' => 'required|date',
        ]);

        $alumno = Alumno::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Alumno registrado correctamente',
            'data' => $alumno
        ], 201);
    }

    public function showByGrado($grado)
    {
        $alumnos = Alumno::where('grado', $grado)->get();

        if ($alumnos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se encontraron alumnos para el grado especificado.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Alumnos encontrados',
            'data' => $alumnos
        ]);
    }

    public function listAlumnos(Request $request)
    {
        // Extraer parámetros de la solicitud con valores por defecto
        $page = $request->input('page', 1);
        $row = $request->input('row', 10);
        $search = $request->input('search', '');
        $orderBy = $request->input('order_by', 'id');
        $order = $request->input('order', 'ASC');
        $params = $request->input('params', []);

        // Query base
        $query = Alumno::query();

        // Búsqueda global (en múltiples campos)
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'LIKE', "%$search%")
                ->orWhere('fecha_nacimiento', 'LIKE', "%$search%")
                ->orWhere('nombre_padre', 'LIKE', "%$search%")
                ->orWhere('nombre_madre', 'LIKE', "%$search%")
                ->orWhere('grado', 'LIKE', "%$search%")
                ->orWhere('seccion', 'LIKE', "%$search%");
            });
        }

        // Aplicar filtros personalizados (`params`)
        if (!empty($params)) {
            foreach ($params as $campo => $valor) {
                $query->where($campo, $valor);
            }
        }

        // Aplicar ordenamiento
        $query->orderBy($orderBy, $order);

        // Paginación manual con `skip` y `take`
        $total = $query->count();
        $alumnos = $query->skip(($page - 1) * $row)->take($row)->get();

        // Respuesta con formato estándar
        return response()->json([
            'status' => 'success',
            'message' => 'Lista de alumnos obtenida correctamente',
            'data' => [
                'content' => $alumnos,
                'totalElements' => $total
            ]
        ]);
    }

    public function showById($id)
    {
        $alumno = Alumno::find($id);

        if (!$alumno) {
            return response()->json([
                'status' => 'error',
                'message' => 'Alumno no encontrado.',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Alumno encontrado',
            'data' => $alumno
        ]);
    }

    public function deleteAlumno($id)
    {
        $alumno = Alumno::find($id);

        if (!$alumno) {
            return response()->json([
                'status' => 'error',
                'message' => 'Alumno no encontrado.',
                'data' => null
            ], 404);
        }

        $alumno->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Alumno eliminado correctamente.',
            'data' => null
        ]);
    }

    public function updateAlumno(Request $request, $id)
    {
        $alumno = Alumno::find($id);

        if (!$alumno) {
            return response()->json([
                'status' => 'error',
                'message' => 'Alumno no encontrado.',
                'data' => null
            ], 404);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'nombre_padre' => 'required|string|max:255',
            'nombre_madre' => 'required|string|max:255',
            'grado' => 'required|string|max:255',
            'seccion' => 'required|string|max:255',
            'fecha_ingreso' => 'required|date',
        ]);

        $alumno->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Alumno actualizado correctamente.',
            'data' => $alumno
        ]);
    }


}
