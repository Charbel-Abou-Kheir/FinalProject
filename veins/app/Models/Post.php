<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // protected $fillable = ['user_id', 'username', 'blood_type', 'status', 'contact_info', 'description'];

    // relationship to user
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
