<?php

namespace App\Filament\Resources\Products;

use App\Enums\ProductsStatusEnum;
use App\Enums\RolesEnum;
use App\Filament\Resources\Products\Pages\CreateProduct;
use App\Filament\Resources\Products\Pages\EditProduct;
use App\Filament\Resources\Products\Pages\ListProducts;
use App\Filament\Resources\Products\Tables\ProductsTable;
use App\Models\Product;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Facades\Filament;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class ProductResource extends Resource
{
  protected static ?string $model = Product::class;

  protected static string|BackedEnum|null $navigationIcon = 'heroicon-s-inbox-stack';

  protected static ?string $recordTitleAttribute = 'title';

  public static function form(Schema $schema): Schema
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
          'blockquote',
          'bold',
          'italic',
          'strike',
          'underline',
          'h1',
          'h2',
          'h3',
          'bulletList',
          'orderedList',
          'link',
          'codeBlock',
          'redo',
          'undo',
          'table',
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

  public static function table(Table $table): Table
  {
    return $table->columns([
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

  public static function getRelations(): array
  {
    return [
      //
    ];
  }

  public static function getPages(): array
  {
    return [
      'index' => ListProducts::route('/'),
      'create' => CreateProduct::route('/create'),
      'edit' => EditProduct::route('/{record}/edit'),
    ];
  }

  public static function canViewAny(): bool
  {
    $user = Filament::auth()->user();
    return $user && $user->hasRole(RolesEnum::Vendor);
  }
}
