<?php

namespace App\Enums;

enum ProductsStatusEnum: string
{
  case Draft = 'draft';
  case Published = 'published';

  public static function labels(): array
  {
    return [
      self::Draft->value => 'Draft',
      self::Published->value => 'Published',
    ];
  }

  public static function colors(): array
  {
    return [
      'gray' => self::Draft->value,
      'success' => self::Published->value,
    ];
  }
}
