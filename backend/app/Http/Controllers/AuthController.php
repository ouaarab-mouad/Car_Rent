<?php

namespace App\Http\Controllers;

// app/Http/Controllers/AuthController.php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:20',
            'role' => 'required|in:client,loueur',
            'EnterpriseName' => 'required_if:role,loueur|string|max:255',
            'licence' => 'required_if:role,loueur|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048'
        ]);

        $userData = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => 'client',
            'requested_role' => $request->role,
            'role_status' => 'pending'
        ];

        if ($request->role === 'loueur') {
            $userData['EnterpriseName'] = $request->EnterpriseName;

            if ($request->hasFile('licence')) {
                $licencePath = $request->file('licence')->store('licences', 'public');
                $userData['licence'] = $licencePath;
            }
        }

        $user = User::create($userData);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => $request->role === 'loueur' ?
                'Registration successful. Your loueur status is pending admin approval.' :
                'Registration successful.'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function verifyPhone(Request $request)
    {
        $request->validate(['code' => 'required|string|size:6']);

        $user = User::where('sms_code', $request->code)
                   ->where('sms_code_expires_at', '>', now())
                   ->firstOrFail();

        $user->update([
            'phone_verified_at' => now(),
            'sms_code' => null
        ]);

        return response()->json(['message' => 'Phone verified successfully!']);
    }
}
