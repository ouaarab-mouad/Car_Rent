<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return $users;
    }
    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.'
            ], 404);
        }

        if ($user->delete()) {
            return response()->     json([
                'success' => true,
                'message' => 'User deleted successfully.',
                'data' => $user
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user.'
            ], 500);
        }
    }
    public function changeUserRole(Request $request, $id )
{
    // Validate input
    $request->validate([
        'role' => 'required|string|in:client,loueur' // Updated to match frontend options
    ]);

    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'User not found.'
        ], 404);
    }

    // Update the role
    $user->role = $request->role;

    if ($user->save()) {
        return response()->json([
            'success' => true,
            'message' => 'User role updated successfully.',
            'data' => $user
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Failed to update user role.'
        ], 500);
    }
}
    public function getUserDetails($id)
    {
        $user = User::with(['reservations', 'vehicles'])->find($id);

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
    }
}
