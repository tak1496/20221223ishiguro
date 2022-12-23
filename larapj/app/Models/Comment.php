<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $fillable = ['post_id', 'user_id', 'comment'];

    public function users()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
