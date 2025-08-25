<?php

namespace App\Filament\Resources\Departments;

use App\Enums\RolesEnum;
use App\Filament\Resources\Departments\Pages\CreateDepartment;
use App\Filament\Resources\Departments\Pages\EditDepartment;
use App\Filament\Resources\Departments\Pages\ListDepartments;
use App\Filament\Resources\Departments\RelationManagers\CategoriesRelationManager;
use App\Models\Department;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Facades\Filament;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class DepartmentResource extends Resource
{
  protected static ?string $model = Department::class;

  protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

  protected static ?string $recordTitleAttribute = 'name';

  public static function form(Schema $schema): Schema
  {
    return $schema
      ->components([
        TextInput::make('name')
          ->required()
          ->live(onBlur: true)
          ->afterStateUpdated(function (string $operation, $state, callable $set) {
            $set('slug', Str::slug($state));
          }),
        TextInput::make('slug')
          ->required(),
        Checkbox::make('active')
          ->required()
          ->default(true),

      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('name')
          ->sortable()
          ->searchable(),
        TextColumn::make('slug'),
      ])
      ->filters([
        //
      ])
      ->recordActions([
        EditAction::make(),
        DeleteAction::make()
      ])
      ->toolbarActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
        ]),
      ])
      ->defaultSort('created_at', 'desc');
  }

  public static function getRelations(): array
  {
    return [
      CategoriesRelationManager::class,
    ];
  }

  public static function getPages(): array
  {
    return [
      'index' => ListDepartments::route('/'),
      'create' => CreateDepartment::route('/create'),
      'edit' => EditDepartment::route('/{record}/edit'),
    ];
  }

  public static function canViewAny(): bool
  {
    $user = Filament::auth()->user();
    return $user && $user->hasRole(RolesEnum::Admin);
  }
}
