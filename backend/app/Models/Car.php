<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'voitures';

    protected $fillable = [
        'marque',
        'modele',
        'annee',
        'prix_par_jour',
        'ville',
        'status',
        'transmission',
        'carburant',
        'nombre_places',
        'kilometrage',
        'description',
        'srcimg',
        'user_id'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'voiture_id');
    }
}
