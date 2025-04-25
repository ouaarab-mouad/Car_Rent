<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Url;
use Illuminate\Validation\ValidationException;

class LouerpublicationController extends Controller
{
    public function store(Request $request)
{
    \Log::info('Incoming request data:', $request->all());

    $validatedData = $request->validate([
        'modele' => 'required|string|max:255',
        'marque' => 'required|string|max:255',
        'categorie' => 'nullable|string|max:255',
        'consumption-per-km' => 'nullable|string|max:255',
        'ville' => 'required|string|max:255',
        'prix_par_jour' => 'required|numeric|min:1',
        'conditions' => 'required',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096' // Changed to nullable
    ]);

    try {
        $validatedData['utilisateur_id'] = auth()->id() ?? 1;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imgPath = $image->store('louerlisting', 'public');

            \Log::info('Stored image at: ' . $imgPath);
            $validatedData['srcimg'] = '/storage/' . $imgPath; // relative path for flexibility
        } else {
            // Optional: Set a fallback default image
            $validatedData['srcimg'] = '/storage/louerlisting/default.jpg';
            \Log::warning('No image uploaded, using default image.');
        }

        if (is_string($validatedData['conditions'])) {
            $validatedData['conditions'] = json_decode($validatedData['conditions'], true);
        }

        $voiture = \App\Models\Voiture::create($validatedData);

        return response()->json([
            'message' => 'Voiture ajoutée avec succès',
            'voiture' => $voiture
        ], 201);

    } catch (\Exception $e) {
        \Log::error('Error creating voiture: ' . $e->getMessage());

        return response()->json([
            'message' => 'Erreur lors de l\'ajout de la voiture',
            'error' => $e->getMessage()
        ], 500);
    }
}


    public function index()
    {
        $voitures = Voiture::with('utilisateur')->get();
        return response()->json($voitures);
    }

    public function update(Request $request, $id)
    {
        // Find the car by ID
        $voiture = Voiture::findOrFail($id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'modele' => 'nullable|string|max:255',
            'marque' => 'nullable|string|max:255',
            'categorie' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'prix_par_jour' => 'nullable|integer|min:1',
            'conditions' => 'nullable|array',
            'conditions.*.carburant' => 'nullable|string|in:essence,diesel,électrique',
            'conditions.*.limite_km' => 'nullable|integer|min:0',
            'conditions.*.age_minimum' => 'nullable|integer|min:18',
            'conditions.*.permis_requis' => 'nullable|string|in:A,B,C'
        ]);

        // Update the car with the validated data
        $voiture->update($validatedData);

        return response()->json([
            'message' => 'Voiture mise à jour avec succès',
            'voiture' => $voiture
        ], 200);
    }

    public function destroy($id)
    {
        // Find the car by ID
        $voiture = Voiture::findOrFail($id);

        // Delete the car
        $voiture->delete();

        return response()->json([
            'message' => 'Voiture supprimée avec succès'
        ], 200);
    }

    /**
     * Display all cars for a given user ID.
     */
    public function userCars($id)
    {
        // Return cars for the given user ID with full image URLs
        $cars = Voiture::where('utilisateur_id', $id)->get();
        $cars->transform(function ($car) {
            if ($car->srcimg && preg_match('#^/storage#', $car->srcimg)) {
                $car->srcimg = url($car->srcimg);
            }
            return $car;
        });
        return response()->json($cars);
    }
}