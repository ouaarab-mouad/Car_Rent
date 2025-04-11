<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    protected $fillable = [
        'utilisateur_id',
        'nom',
        'modele',
        'marque',
        'conditions'
    ];

    protected $casts = [
        'conditions' => 'array'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class);
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
