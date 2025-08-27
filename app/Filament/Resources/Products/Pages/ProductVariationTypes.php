<?php

namespace App\Filament\Resources\Products\Pages;

use App\Enums\ProductVariationTypesEnum;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\Products\ProductResource;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class ProductVariationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $navigationLabel = 'Product Variation Types';
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-m-numbered-list';

    protected static ?string $title = 'Product Variation Types';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Repeater::make('variationTypes')
                ->relationship()
                ->hiddenLabel()
                ->collapsible()
                ->defaultItems(1)
                ->addActionLabel('Add new variation type')
                ->columnSpanFull()
                ->schema([
                    TextInput::make('name')
                        ->required(),

                    Select::make('type')
                        ->options(ProductVariationTypesEnum::labels())
                        ->required(),

                    Repeater::make('options')
                        ->defaultItems(1)
                        ->relationship()
                        ->collapsible()
                        ->columns(2)
                        ->schema([
                            TextInput::make('name')
                                ->required()
                                ->columnSpan(2),

                            SpatieMediaLibraryFileUpload::make('images')
                                ->image()
                                ->multiple()
                                ->openable()
                                ->panelLayout('grid')
                                ->collection('images')
                                ->reorderable()
                                ->appendFiles()
                                ->preserveFilenames()
                                ->columnSpan(2),
                        ])
                        ->columnSpan(2),
                ]),
        ]);
    }


    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
