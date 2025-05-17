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

        // Check for existing reservations in the same date range
        $existingReservation = Reservation::where('voiture_id', $request->voiture_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('date_debut', [$request->date_debut, $request->date_fin])
                    ->orWhereBetween('date_fin', [$request->date_debut, $request->date_fin])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('date_debut', '<=', $request->date_debut)
                            ->where('date_fin', '>=', $request->date_fin);
                    });
            })
            ->where('statut', '!=', 'annulé')
            ->first();

        if ($existingReservation) {
            return response()->json([
                'message' => 'Le véhicule est déjà réservé pour cette période.',
                'existing_reservation' => [
                    'date_debut' => $existingReservation->date_debut,
                    'date_fin' => $existingReservation->date_fin
                ]
            ], 422);
        }

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

    // Get all reservations for the authenticated client
    public function clientReservations(Request $request)
    {
        $client = $request->user();
        $reservations = \App\Models\Reservation::with(['voiture.utilisateur', 'loueur'])
            ->where('client_id', $client->id)
            ->orderBy('date_debut', 'desc')
            ->get();

        // Format the reservations for frontend
        $formatted = $reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'date_debut' => $reservation->date_debut,
                'date_fin' => $reservation->date_fin,
                'prix_total' => $reservation->prix_total,
                'statut' => $reservation->statut,
                'car' => [
                    'id' => $reservation->voiture->id ?? null,
                    'marque' => $reservation->voiture->marque ?? null,
                    'modele' => $reservation->voiture->modele ?? null,
                    'srcimg' => $reservation->voiture->srcimg ?? null,
                ],
                'loueur' => $reservation->loueur ? [
                    'id' => $reservation->loueur->id,
                    'nom' => $reservation->loueur->nom,
                    'prenom' => $reservation->loueur->prenom,
                    'email' => $reservation->loueur->email,
                ] : null,
            ];
        });

        return response()->json([
            'success' => true,
            'reservations' => $formatted
        ]);
    }
}
