<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'EnterpriseName',
        'email',
        'phone',
        'password',
        'licence',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'client_id');
    }

    public function vehicles()
    {
        return $this->hasMany(Voiture::class, 'utilisateur_id');
    }

    public function getFullNameAttribute()
    {
        return trim($this->nom . ' ' . $this->prenom);
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

    public function hasLicence()
    {
        return !empty($this->licence);
    }
}
