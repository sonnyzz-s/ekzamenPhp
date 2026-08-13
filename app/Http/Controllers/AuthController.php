<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);

        return response()->json(['message' => 'user registered', 'user' => $user], 201);
    }

   public function login(LoginRequest $request)
   {
        $data = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'password' => 'required|string',
        ]);

    $user = User::where('name', $data['name'])->where('email', $data['email'])->first();

    if (!$user || !Hash::check($data['password'], $user->password)) {
        return response()->json([
            'message' => 'invalid data'
        ], 401);
    }

    Auth::login($user);

    $request->session()->regenerate();

    return response()->json([
        'message' => 'log in',
        'user' => $user
    ]);
}

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'log out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function showRegister()
    {
        return Inertia::render('register');
    }

    public function showLogin()
    {
        return Inertia::render('login');
    }
}