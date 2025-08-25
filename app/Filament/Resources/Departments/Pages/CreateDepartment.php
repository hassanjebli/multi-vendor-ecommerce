<?php

namespace App\Filament\Resources\Departments\Pages;

use App\Filament\Resources\Departments\DepartmentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateDepartment extends CreateRecord
{
  protected static string $resource = DepartmentResource::class;

  public function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }
}
