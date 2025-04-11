<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'numero_telephone',
        'mot_de_passe',
        'role',
        'autorisation_location'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFullNameAttribute()
    {
        return $this->nom . ' ' . $this->prenom;
    }

    public function isAdmin()
    {
        return $this->role === 'administrateur';
    }

    public function isLoueur()
    {
        return $this->role === 'loueur';
    }

    public function isUtilisateur()
    {
        return $this->role === 'utilisateur';
    }

    public function isAutorise()
    {
        return $this->autorisation_location === 'autorisé';
    }
}
