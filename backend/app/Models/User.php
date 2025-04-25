<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $fillable = [
        'name', 'email', 'numero_telephone',
        'password', 'role', 'licence',
        'email_verified_at', 'remember_token'
    ];
    
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'sms_code_expires_at' => 'datetime'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];



    public function getFullNameAttribute()
    {
        return $this->name;
    }

    public function isAdmin()
    {
        return $this->role === 'administrateur';
    }

    public function isLoueur()
    {
        return $this->role === 'loueur';
    }

    public function isClient()
    {
        return $this->role === 'client';
    }
}
