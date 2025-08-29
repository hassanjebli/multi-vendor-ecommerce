<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariation extends Model
{
  protected $table = 'product_variations';
  protected $casts = [
    'variation_type_option_ids' => 'json',
  ];

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
