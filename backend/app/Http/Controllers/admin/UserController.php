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
        'role' => 'required|string|in:client,administrateur,loueur' // Adjust roles as needed
    ]);

    $user = User::find($id);

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
}
