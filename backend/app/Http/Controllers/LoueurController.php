<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class LoueurController extends Controller
{
    // Get all reservations for the authenticated loueur
    public function reservations(Request $request)
    {
        $loueur = $request->user();
        $reservations = Reservation::with(['voiture', 'client'])
            ->where('loueur_id', $loueur->id)
            ->orderBy('date_debut', 'desc')
            ->get();

        return response()->json($reservations);
    }

    public function acceptReservation(Request $request, $id)
    {
        $loueur = $request->user();
        $reservation = Reservation::where('id', $id)
            ->where('loueur_id', $loueur->id)
            ->firstOrFail();
        $reservation->statut = 'acceptée';
        $reservation->save();

        // Update car availability
        $car = $reservation->voiture;
        if ($car) {
            $car->status = 'reserve';
            $car->disponible = false;
            $car->save();
        }

        return response()->json(['message' => 'Réservation acceptée', 'reservation' => $reservation]);
    }

    public function refuseReservation(Request $request, $id)
    {
        $loueur = $request->user();
        $reservation = Reservation::where('id', $id)
            ->where('loueur_id', $loueur->id)
            ->firstOrFail();
        $reservation->statut = 'refusée';
        $reservation->save();
        return response()->json(['message' => 'Réservation refusée', 'reservation' => $reservation]);
    }
} 