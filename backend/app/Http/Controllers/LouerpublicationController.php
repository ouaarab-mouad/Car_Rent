<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Url;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;

class LouerpublicationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }



    /**
     * Remove the specified car from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $car = Voiture::findOrFail($id);
            
            // Check if the authenticated user is the owner of the car
            if (auth()->id() !== $car->utilisateur_id) {
                return response()->json([
                    'message' => 'Unauthorized. You can only delete your own cars.'
                ], 403);
            }
            
            // Delete the car
            $car->delete();
            
            return response()->json([
                'message' => 'Car deleted successfully'
            ]);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Car not found'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Error deleting car: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while deleting the car',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // Check if user has loueur role
        if (Auth::user()->role !== 'loueur') {
            return response()->json(['message' => 'Unauthorized. Only loueurs can add cars.'], 403);
        }

        \Log::info('Incoming request data:', $request->all());

        $validatedData = $request->validate([
            'modele' => 'required|string|max:255',
            'marque' => 'required|string|max:255',
            'categorie' => 'nullable|string|max:255',
            'consumption-per-km' => 'required|numeric|min:0',
            'ville' => 'required|string|max:255',
            'prix_par_jour' => 'required|numeric|min:1',
            'classe' => 'required|string|max:255',
            'conditions' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096'
        ]);

        // Handle numeric fields
        if (isset($validatedData['consumption-per-km'])) {
            $validatedData['consumption-per-km'] = floatval($validatedData['consumption-per-km']);
        }

        // Handle classe field
        if (isset($validatedData['classe'])) {
            $validatedData['classe'] = trim($validatedData['classe']);
            if (empty($validatedData['classe'])) {
                $validatedData['classe'] = null;
            }
        }

        // Log the data being saved
        \Log::info('Saving car data:', [
            'modele' => $validatedData['modele'],
            'marque' => $validatedData['marque'],
            'consumption-per-km' => $validatedData['consumption-per-km'],
            'classe' => $validatedData['classe']
        ]);

        // Set the authenticated user's ID
        $validatedData['utilisateur_id'] = Auth::id();

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

        try {
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
        try {
            // Check authentication
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Only get cars belonging to the authenticated user
            $voitures = Voiture::where('utilisateur_id', Auth::id())
                ->with('utilisateur')
                ->get();
            
            // Transform conditions for each car
            foreach ($voitures as $voiture) {
                if (is_string($voiture->conditions)) {
                    $voiture->conditions = json_decode($voiture->conditions, true);
                }

                // Ensure image URL is absolute
                if ($voiture->srcimg && preg_match('#^/storage#', $voiture->srcimg)) {
                    $voiture->srcimg = url($voiture->srcimg);
                }
            }

            return response()->json($voitures);
        } catch (\Exception $e) {
            \Log::error('Error fetching voitures: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching cars',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Check authentication
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Check role
        if (!Auth::user()->hasRole('loueur')) {
            throw new AuthorizationException('Only loueurs can modify cars');
        }

        try {
            // Find the car by ID
            $voiture = Voiture::findOrFail($id);
            
            // Check if user owns this car
            if ($voiture->utilisateur_id !== Auth::id()) {
                throw new AuthorizationException('You can only modify your own cars');
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Car not found',
                'error' => 'No car found with the specified ID'
            ], 404);
        }

        // Validate the incoming data
        $validatedData = $request->validate([
            'modele' => 'nullable|string|max:255',
            'marque' => 'nullable|string|max:255',
            'categorie' => 'nullable|string|max:255',
            'consumption-per-km' => 'nullable|numeric',
            'ville' => 'nullable|string|max:255',
            'prix_par_jour' => 'nullable|numeric|min:1',
            'classe' => 'nullable|string|max:255',
            'conditions' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096'
        ]);

        // Handle numeric fields
        if (isset($validatedData['consumption-per-km'])) {
            $validatedData['consumption-per-km'] = floatval($validatedData['consumption-per-km']);
        }

        // Handle classe field
        if (isset($validatedData['classe'])) {
            $validatedData['classe'] = trim($validatedData['classe']);
            if (empty($validatedData['classe'])) {
                $validatedData['classe'] = null;
            }
        }

        // Set the authenticated user's ID
        $validatedData['utilisateur_id'] = Auth::id();

        // Handle conditions - ensure it's properly formatted as JSON
        $conditions = $validatedData['conditions'];
        
        // If conditions is a string, decode it
        if (is_string($conditions)) {
            $decoded = json_decode($conditions, true);
            $conditions = is_array($decoded) ? $decoded : [];
        }
        
        // Ensure conditions is an array
        if (!is_array($conditions)) {
            $conditions = [];
        }
        
        // Define all possible conditions with default values
        $defaultConditions = [
            'airConditioner' => false,
            'automatic' => false,
            'airbag' => false,
            'abs' => false,
            'cruiseControl' => false
        ];
        
        // Filter to only include valid conditions
        $validConditions = array_intersect_key($conditions, $defaultConditions);
        
        // Merge with defaults to ensure all conditions are present
        $validatedData['conditions'] = array_merge($defaultConditions, $validConditions);
        
        // Convert to JSON string for storage
        $validatedData['conditions'] = json_encode($validatedData['conditions']);

        try {
            \Log::info('Starting car update', ['car_id' => $id, 'user_id' => Auth::id()]);
            
            // Handle image upload if provided
            if ($request->hasFile('image')) {
                \Log::info('New image provided for update');
                
                // Delete old image if it exists
                if ($voiture->srcimg) {
                    $oldImagePath = str_replace('/storage/', '', $voiture->srcimg);
                    if (Storage::disk('public')->exists($oldImagePath)) {
                        Storage::disk('public')->delete($oldImagePath);
                        \Log::info('Old image deleted', ['path' => $oldImagePath]);
                    }
                }
                
                // Store new image
                $image = $request->file('image');
                $imgPath = $image->store('louerlisting', 'public');
                $validatedData['srcimg'] = '/storage/' . $imgPath;
                \Log::info('New image stored', ['path' => $validatedData['srcimg']]);
            } else {
                // Keep the existing image if no new one is uploaded
                if (empty($validatedData['srcimg']) && $voiture->srcimg) {
                    $validatedData['srcimg'] = $voiture->srcimg;
                }
                \Log::info('Using existing image', ['path' => $voiture->srcimg ?? 'No existing image']);
            }

            // Convert conditions array to JSON string if it's an array
            if (is_array($conditions)) {
                $validatedData['conditions'] = json_encode($conditions);
            }

            // Log the data being used for update
            \Log::info('Updating car with data:', $validatedData);
            
            // Update the car with the validated data
            $voiture->update($validatedData);
            
            // Refresh the model to get the updated data
            $voiture->refresh();
            \Log::info('Car updated successfully', ['car_id' => $voiture->id]);

            return response()->json([
                'message' => 'Voiture mise à jour avec succès',
                'voiture' => $voiture,
                'updated_fields' => array_keys($validatedData)
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error updating voiture: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de la voiture',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $voiture = Voiture::with('utilisateur')->findOrFail($id);

            // Transform the conditions to a proper array if it's stored as JSON
            if (is_string($voiture->conditions)) {
                $decoded = json_decode($voiture->conditions, true);
                $voiture->conditions = is_array($decoded) ? $decoded : [];
            } elseif (!is_array($voiture->conditions)) {
                $voiture->conditions = [];
            }

            // Ensure all condition fields are present with default values
            $defaultConditions = [
                'airConditioner' => false,
                'automatic' => false,
                'airbag' => false,
                'abs' => false,
                'cruiseControl' => false
            ];
            $voiture->conditions = array_merge($defaultConditions, $voiture->conditions);

            // Ensure image URL is absolute
            if ($voiture->srcimg && preg_match('#^/storage#', $voiture->srcimg)) {
                $voiture->srcimg = url($voiture->srcimg);
            }

            return response()->json($voiture);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Car not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get all cars for the authenticated user.
     *
     * @return \Illuminate\Http\Response
     */
    public function userCars()
    {
        try {
            // Check authentication
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Check if user is a loueur
            if (!Auth::user()->isLoueur()) {
                throw new AuthorizationException('Only loueurs can view their cars');
            }

            // Get all cars for the authenticated user
            $voitures = Voiture::where('utilisateur_id', Auth::id())
                ->with('utilisateur')
                ->get();

            // Transform conditions for each car
            foreach ($voitures as $voiture) {
                if (is_string($voiture->conditions)) {
                    $voiture->conditions = json_decode($voiture->conditions, true);
                }

                // Ensure image URL is absolute
                if ($voiture->srcimg && preg_match('#^/storage#', $voiture->srcimg)) {
                    $voiture->srcimg = url($voiture->srcimg);
                }
            }

            return response()->json($voitures);
        } catch (\Exception $e) {
            \Log::error('Error in userCars: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching user cars',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}