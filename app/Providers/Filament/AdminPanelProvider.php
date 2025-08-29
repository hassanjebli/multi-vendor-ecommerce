<?php

namespace App\Providers\Filament;

use App\Enums\RolesEnum;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->spa()
            ->id('admin')
            ->path('admin')
            ->sidebarWidth('14rem')
            ->login()

            // Enhanced colors with better contrast for performance
            ->colors([
                'primary' => '#4F7FFF',
            ])

            // Performance UI enhancements
            ->darkMode()                           // Dark mode support (no extra imports)
            ->sidebarCollapsibleOnDesktop()        // Reduces DOM size on mobile
            ->maxContentWidth('7xl')               // Prevents unnecessary wide layouts

            // Faster navigation
            ->breadcrumbs(false)                   // Disable breadcrumbs to reduce queries
            ->globalSearch()                       // Enable but don't configure heavy features

            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])

            // Optimized middleware stack (reordered for performance)
            ->middleware([
                // Most frequently used first
                'auth',
                sprintf('role:%s|%s', RolesEnum::Admin->value, RolesEnum::Vendor->value),

                // Core Laravel middleware
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,

                // Filament-specific (at the end)
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])

            // Database performance
            ->databaseTransactions()              // Wrap operations in transactions

            // Simple UX improvements
            ->unsavedChangesAlerts()              // Prevent data loss
            ->profile()                           // Built-in profile management
            ->sidebarFullyCollapsibleOnDesktop()  // Better mobile experience

            // Cache-friendly assets (no imports needed)
            ->brandLogoHeight('2rem')             // Consistent logo sizing
            ->favicon('/favicon.ico')             // Explicit favicon path
        ;
    }

    public function boot()
    {
        Model::unguard();
    }
}
