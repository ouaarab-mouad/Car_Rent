<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'phone',
        'role',
        'licence',
        'EnterpriseName',
        'requested_role',
        'role_status',
        'ville'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role_status' => 'string'
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

    public function isPendingLoueur()
    {
        return $this->requested_role === 'loueur' && $this->role_status === 'pending';
    }

    public function isApprovedLoueur()
    {
        return $this->role === 'loueur' && $this->role_status === 'approved';
    }

    public function isRejectedLoueur()
    {
        return $this->requested_role === 'loueur' && $this->role_status === 'rejected';
    }

    /**
     * Check if the user has a specific role
     *
     * @param string $role
     * @return bool
     */
    public function hasRole($role)
    {
        if ($role === 'admin') {
            return $this->isAdmin();
        } elseif ($role === 'loueur') {
            return $this->isLoueur();
        } elseif ($role === 'client') {
            return $this->isClient();
        }

        return false;
    }
}
