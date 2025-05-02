<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'loueur_id',
        'voiture_id',
        'date_debut',
        'date_fin',
        'prix_total',
        'statut'
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function loueur()
    {
        return $this->belongsTo(User::class, 'loueur_id');
    }

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'voiture_id');
    }

    public function isDisponible()
    {
        return $this->statut === 'disponible';
    }

    public function isNonDisponible()
    {
        return $this->statut === 'non_disponible';
    }

    public function isEnAttente()
    {
        return $this->statut === 'en_attente';
    }

    public function setDateDebutAttribute($value)
    {
        if ($value instanceof \DateTime) {
            $this->attributes['date_debut'] = $value->format('Y-m-d');
        } else {
            $this->attributes['date_debut'] = date('Y-m-d', strtotime($value));
        }
    }

    public function setDateFinAttribute($value)
    {
        if ($value instanceof \DateTime) {
            $this->attributes['date_fin'] = $value->format('Y-m-d');
        } else {
            $this->attributes['date_fin'] = date('Y-m-d', strtotime($value));
        }
    }

    public function getDureeReservation()
    {
        $start = new \DateTime($this->date_debut);
        $end = new \DateTime($this->date_fin);
        return $start->diff($end)->days;
    }
}
