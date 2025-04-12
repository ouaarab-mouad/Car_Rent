<?php

// app/Http/Controllers/AuthController.php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'phone' => 'required|string|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'sms_code' => rand(100000, 999999), // 6-digit code
            'sms_code_expires_at' => Carbon::now()->addMinutes(30)
        ]);

        $user->sendEmailVerificationNotification();
    
        return response()->json([
            'message' => 'Registration successful! Please check your email and phone.'
        ], 201);
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