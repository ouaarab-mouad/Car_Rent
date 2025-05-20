<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        try {
            // Let's log the authenticated user information for debugging
            \Log::info('User authentication check', [
                'is_authenticated' => Auth::check(),
                'user_role' => Auth::check() ? Auth::user()->role : 'not authenticated',
                'user_id' => Auth::check() ? Auth::user()->id : null
            ]);

            \Log::info('Fetching all users');
            $users = User::all();
            \Log::info('Successfully fetched users', ['count' => $users->count()]);

            return response()->json([
                'success' => true,
                'data' => $users
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching users: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully.',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting user: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
                'user_id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function changeUserRole(Request $request, $id)
    {
        try {
            // Validate input
            $request->validate([
                'role' => 'required|string|in:client,loueur,administrateur',
                'role_status' => 'required|string|in:pending,approved,rejected'
            ]);

            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            // Update the role and status
            $user->role = $request->role;
            $user->role_status = $request->role_status;

            // If approving a loueur request, clear the requested_role since it's now approved
            if ($request->role === 'loueur' && $request->role_status === 'approved') {
                $user->requested_role = null;
            }

            $user->save();

            \Log::info('User role updated', [
                'user_id' => $id,
                'new_role' => $request->role,
                'new_status' => $request->role_status
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User role updated successfully.',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            \Log::error('Error updating user role: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
                'user_id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user role: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUserDetails($id)
    {
        try {
            \Log::info('Fetching user details with related data', ['user_id' => $id]);
            $user = User::with(['reservations' => function($query) {
                $query->with('voiture');
            }, 'vehicles'])->find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching user details: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
                'user_id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch user details: ' . $e->getMessage()
            ], 500);
        }
    }
}
