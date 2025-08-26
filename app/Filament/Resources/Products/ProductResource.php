<?php

namespace App\Filament\Resources\Products;

use BackedEnum;
use App\Models\Product;
use App\Enums\RolesEnum;
use Filament\Pages\Page;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;
use Filament\Facades\Filament;
use Filament\Actions\EditAction;
use Filament\Resources\Resource;
use App\Enums\ProductsStatusEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Forms\Components\Select;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Pages\Enums\SubNavigationPosition;
use App\Filament\Resources\Products\Pages\EditProduct;
use App\Filament\Resources\Products\Pages\ListProducts;
use App\Filament\Resources\Products\Pages\CreateProduct;
use App\Filament\Resources\Products\Pages\ProductImages;
use App\Filament\Resources\Products\Tables\ProductsTable;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cube';
    protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;

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

    public static function table(Table $table): Table
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
            'images' => ProductImages::route('/{record}/images')
        ];
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            EditProduct::class,
            ProductImages::class,
        ]);
    }

    public static function canViewAny(): bool
    {
        /**
         * @var \App\Models\User|null $user
         */
        $user = Filament::auth()->user();
        return $user && $user->hasRole(RolesEnum::Vendor);
    }
}
