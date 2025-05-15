<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    // Store a new reservation
    public function store(Request $request)
    {
        $request->validate([
            'voiture_id' => 'required|exists:voitures,id',
            'date_debut' => 'required|date|after_or_equal:today',
            'date_fin' => 'required|date|after:date_debut',
        ]);

        $voiture = Voiture::findOrFail($request->voiture_id);
        $client = $request->user();
        $loueur_id = $voiture->utilisateur_id;
        $prix_par_jour = $voiture->prix_par_jour;

        $start = new \DateTime($request->date_debut);
        $end = new \DateTime($request->date_fin);
        $days = $start->diff($end)->days;
        if ($days < 1) {
            return response()->json(['message' => 'La réservation doit être d\'au moins 1 jour.'], 422);
        }
        $prix_total = $days * $prix_par_jour;

        $reservation = Reservation::create([
            'client_id' => $client->id,
            'loueur_id' => $loueur_id,
            'voiture_id' => $voiture->id,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'prix_total' => $prix_total,
            'statut' => 'en_attente',
        ]);

        return response()->json([
            'message' => 'Réservation créée avec succès',
            'reservation' => $reservation
        ], 201);
    }
} 