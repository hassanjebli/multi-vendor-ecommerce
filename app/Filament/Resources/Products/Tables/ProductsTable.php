<?php

namespace App\Filament\Resources\Products\Tables;

use App\Enums\ProductsStatusEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table->columns([

            SpatieMediaLibraryImageColumn::make('images')
                ->collection('images')
                ->limit(1)
                ->conversion('thumb')
                ->label('Image'),
            TextColumn::make('title')
                ->sortable()
                ->words(10)
                ->searchable(),
            TextColumn::make('status')
                ->badge()
                ->colors(ProductsStatusEnum::colors()),
            TextColumn::make('department.name'),
            TextColumn::make('category.name'),
            TextColumn::make('created_at')
                ->dateTime(),


        ])
            ->filters([
                SelectFilter::make('status')
                    ->options(ProductsStatusEnum::labels()),
                SelectFilter::make('department_id')
                    ->relationship('department', 'name')
                    ->label('Department'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
