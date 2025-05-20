<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Voiture extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'modele',
        'marque',
        'categorie',
        'ville',
        'prix_par_jour',
        'conditions',
        'srcimg',
        'status',
        'disponible',
        'consumption-per-km',
        'classe'
    ];

    protected $casts = [
        'conditions' => 'array',
        'disponible' => 'boolean'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'voiture_id');
    }

    public function getConditionsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setConditionsAttribute($value)
    {
        $this->attributes['conditions'] = json_encode($value);
    }

    public function getCarburantRequirement()
    {
        return $this->conditions['carburant'] ?? null;
    }

    public function getKmLimit()
    {
        return $this->conditions['limite_km'] ?? null;
    }
}
