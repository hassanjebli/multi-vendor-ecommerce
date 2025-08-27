<?php

namespace App\Filament\Resources\Products\Pages;

use Filament\Schemas\Schema;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\Products\ProductResource;
use BackedEnum;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class ProductImages extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $navigationLabel = 'Product Images';

    protected static ?string $title = 'Product Images';
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-photo';
    public function form(Schema $schema): Schema
    {
        return $schema->components([
            SpatieMediaLibraryFileUpload::make('images')
                ->multiple()
                ->openable()
                ->panelLayout('grid')
                ->collection('images')
                ->reorderable()
                ->appendFiles()
                ->preserveFilenames(false)
                ->columnSpan(2)
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
