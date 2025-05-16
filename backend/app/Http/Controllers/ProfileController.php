<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // Get the authenticated user's profile
    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json($user);
    }

    // Get a public profile by user ID
    public function show($id, Request $request)
    {
        $user = User::findOrFail($id);
        $authUser = $request->user();
        // If the authenticated user is the owner, return full info
        if ($authUser && $authUser->id === $user->id) {
            return response()->json($user);
        }
        // Otherwise, return only public info
        $public = $user->only(['id', 'nom', 'prenom', 'email', 'role', 'EnterpriseName']);
        return response()->json($public);
    }

    // Get the authenticated loueur's profile with their cars
    public function loueurProfile(Request $request)
    {
        $user = $request->user();
        if (!$user->isLoueur()) {
            return response()->json(['message' => 'Not a loueur'], 403);
        }
        $user->load('vehicles');
        return response()->json($user);
    }

    // Update the authenticated user's profile
    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'sometimes|string|max:20',
            'EnterpriseName' => 'sometimes|string|max:255',
        ]);
        $user->update($data);
        return response()->json($user);
    }
} 