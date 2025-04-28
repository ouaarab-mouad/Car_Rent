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
            $voiture = Voiture::with('utilisateur')->find($id);

            if (!$voiture) {
                return response()->json([
                    'success' => false,
                    'message' => 'Voiture not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $voiture
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch voiture: ' . $e->getMessage()
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
