<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Voiture::where('disponible', true)
            ->select([
                'id',
                'modele as name',
                'marque as brand',
                'categorie as type',
                'prix_par_jour as price',
                'srcimg as image',
                'conditions'
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
