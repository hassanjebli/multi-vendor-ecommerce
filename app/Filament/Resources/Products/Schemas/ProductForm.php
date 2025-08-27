<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Enums\ProductsStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')
                ->live(onBlur: true)
                ->required()
                ->afterStateUpdated(function (string $operation, $state, callable $set) {
                    $set('slug', Str::slug($state));
                }),
            TextInput::make('slug')
                ->required(),
            Select::make('department_id')
                ->relationship('department', 'name')
                ->label('Department')
                ->preload()
                ->searchable()
                ->required()
                ->reactive()
                ->afterStateUpdated(function (string $operation, $state, callable $set) {
                    $set('category_id', null);
                }),
            Select::make('category_id')
                ->relationship(name: 'category', titleAttribute: 'name', modifyQueryUsing: function (Builder $query, callable $get) {
                    $departmentId = $get('department_id');
                    if ($departmentId) {
                        $query->where('department_id', $departmentId);
                    }
                })
                ->label('Category')
                ->preload()
                ->searchable()
                ->required(),
            RichEditor::make('description')
                ->required()
                ->toolbarButtons([
                    ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'link'],
                    ['h2', 'h3', 'alignStart', 'alignCenter', 'alignEnd'],
                    ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
                    ['table', 'attachFiles'],
                    ['undo', 'redo'],
                ])
                ->columnSpanFull(),

            TextInput::make('price')
                ->required()
                ->numeric(),
            TextInput::make('quantity')
                ->numeric()
                ->required()
                ->default(0),
            Select::make('status')
                ->options(ProductsStatusEnum::labels())
                ->default(ProductsStatusEnum::Draft->value)
                ->required(),

        ]);
    }
}
