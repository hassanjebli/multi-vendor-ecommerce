<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'price',
        'variation_type_option_ids',
    ];

    protected $casts = [
        'variation_type_option_ids' => 'array',
    ];
}
