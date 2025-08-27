<?php

namespace App\Enums;

enum ProductVariationTypesEnum: string
{
    case SELECT = 'select';
    case RADIO = 'radio';
    case IMAGE = 'image';
    public static function labels(): array
    {
        return [
            self::SELECT->value => 'Select',
            self::RADIO->value => 'Radio',
            self::IMAGE->value => 'Image',
        ];
    }

    
}
