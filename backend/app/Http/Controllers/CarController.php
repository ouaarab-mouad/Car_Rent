<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Voiture::select([
            'id',
            'utilisateur_id',
            'modele as name',
            'marque as brand',
            'categorie as type',
            'consumption-per-km',
            'ville',
            'classe',
            'prix_par_jour as price',
            'disponible',
            'status',
            'conditions',
            'srcimg as image',
            'created_at',
            'updated_at'
        ])
        ->get()
        ->map(function ($car) {
            // Convert the image path to a full URL
            $car->image = $car->image ? asset('' . $car->image) : null;
            $car->transmission = $car->conditions['transmission'] ?? 'Automatic';
            $car->fuel_type = $car->conditions['carburant'] ?? 'Gasoline';
            unset($car->conditions);
            return $car;
        });

        return response()->json($cars);
    }
}
