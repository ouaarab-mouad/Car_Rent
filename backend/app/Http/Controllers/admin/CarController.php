<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    public function getCarDetails($id)
    {
        try {
            Log::info('Fetching car details for ID: ' . $id);

            // First check if the car exists
            $car = Car::where('id', $id)->first();

            if (!$car) {
                Log::error('Car not found with ID: ' . $id);
                return response()->json([
                    'success' => false,
                    'message' => 'Car not found'
                ], 404);
            }

            // Load the relationship
            $car->load('utilisateur');

            Log::info('Car details found:', [
                'id' => $car->id,
                'marque' => $car->marque,
                'modele' => $car->modele
            ]);

            return response()->json([
                'success' => true,
                'data' => $car
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching car details: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch car details: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteCar($id)
    {
        try {
            Log::info('Attempting to delete car with ID: ' . $id);

            $car = Car::findOrFail($id);
            $car->delete();

            Log::info('Car deleted successfully');

            return response()->json([
                'success' => true,
                'message' => 'Car deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting car: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete car: ' . $e->getMessage()
            ], 500);
        }
    }
}
