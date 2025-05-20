<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'loueur_id',
        'client_id',
        'description',
        'etoiles'
    ];

    protected $casts = [
        'etoiles' => 'integer'
    ];

    public function loueur()
    {
        return $this->belongsTo(User::class, 'loueur_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function setEtoilesAttribute($value)
    {
        $this->attributes['etoiles'] = max(0, min(5, $value)); // Ensure rating is between 0 and 5
    }

    public function isPositive()
    {
        return $this->etoiles >= 3;
    }

    public function isNegative()
    {
        return $this->etoiles < 3;
    }

    public function getRatingStars()
    {
        return str_repeat('⭐', $this->etoiles) . str_repeat('☆', 5 - $this->etoiles);
    }
}
