<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateProduct extends CreateRecord
{
  protected static string $resource = ProductResource::class;

  protected function mutateFormDataBeforeCreate(array $data): array
  {
    $data['created_by'] = Auth::id();
    $data['updated_by'] = Auth::id();
    return $data;
  }
}
