<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VoitureController extends Controller
{
    public function index()
    {
        try {
            \Log::info('Fetching voitures with utilisateur relationship');
            $voitures = Voiture::with('utilisateur')->get();
            \Log::info('Successfully fetched voitures', ['count' => $voitures->count()]);

            return response()->json([
                'success' => true,
                'data' => $voitures
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching voitures: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch voitures: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $voiture = Voiture::with(['utilisateur', 'reservations' => function($query) {
                $query->where('statut', '!=', 'cancelled')
                      ->orderBy('date_debut', 'desc');
            }])->find($id);

            if (!$voiture) {
                return response()->json([
                    'success' => false,
                    'message' => 'Car not found'
                ], 404);
            }

            // Format the car data for the frontend
            $formattedData = [
                'id' => $voiture->id,
                'marque' => $voiture->marque,
                'modele' => $voiture->modele,
                'categorie' => $voiture->categorie,
                'ville' => $voiture->ville,
                'prix_par_jour' => $voiture->prix_par_jour,
                'status' => $voiture->status,
                'disponible' => $voiture->disponible,
                'srcimg' => $voiture->srcimg,
                'conditions' => $voiture->conditions,
                'created_at' => $voiture->created_at,
                'updated_at' => $voiture->updated_at,
                'utilisateur' => [
                    'id' => $voiture->utilisateur->id,
                    'nom' => $voiture->utilisateur->nom,
                    'prenom' => $voiture->utilisateur->prenom,
                    'email' => $voiture->utilisateur->email,
                    'telephone' => $voiture->utilisateur->phone,
                    'role' => $voiture->utilisateur->role
                ],
                'reservations' => $voiture->reservations->map(function($reservation) {
                    return [
                        'id' => $reservation->id,
                        'date_debut' => $reservation->date_debut,
                        'date_fin' => $reservation->date_fin,
                        'prix_total' => $reservation->prix_total,
                        'statut' => $reservation->statut,
                        'client' => [
                            'id' => $reservation->client->id,
                            'nom' => $reservation->client->nom,
                            'prenom' => $reservation->client->prenom,
                            'email' => $reservation->client->email
                        ]
                    ];
                })
            ];

            return response()->json([
                'success' => true,
                'data' => $formattedData
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching car details: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch car details: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $voiture = Voiture::find($id);

            if (!$voiture) {
                return response()->json([
                    'success' => false,
                    'message' => 'Voiture not found'
                ], 404);
            }

            $voiture->delete();

            return response()->json([
                'success' => true,
                'message' => 'Voiture deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete voiture: ' . $e->getMessage()
            ], 500);
        }
    }
}
