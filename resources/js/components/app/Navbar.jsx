import Logo from '@/components/navbar-components/logo';
import UserMenu from '@/components/navbar-components/user-menu';
import ShoppingCartComponent from '@/components/app/ShoppingCartComponent';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

// Dummy cart data
const dummyCartItems = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        name: 'Smart Watch Series 5',
        price: 299.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
    },
];

export default function Navbar() {
    const { totalPrice, totalQuantity, cartItems } = usePage().props;
    const { url } = usePage();
    const isAuthenticated = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Use cartItems from props, fallback to dummy data if not provided
    const actualCartItems = cartItems || dummyCartItems;

    // Check if link is active
    const isActiveLink = (href) => {
        if (href === '/') {
            return url === '/';
        }
        return url.startsWith(href);
    };

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b px-4 backdrop-blur md:px-6">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-9 md:hidden"
                                variant="ghost"
                                size="icon"
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Toggle mobile menu"
                            >
                                <svg
                                    className="pointer-events-none transition-transform duration-200"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-56 p-2 md:hidden">
                            <nav className="flex flex-col space-y-1">
                                {navigationLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className={cn(
                                            'relative rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                            isActiveLink(link.href)
                                                ? 'bg-primary/10 text-primary font-semibold'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {isActiveLink(link.href) && (
                                            <span className="bg-primary absolute top-1/2 left-1 h-4 w-0.5 -translate-y-1/2 rounded-full" />
                                        )}
                                        {link.label}
                                    </Link>
                                ))}
                                {!isAuthenticated && (
                                    <div className="border-border mt-3 space-y-1 border-t pt-3">
                                        <Link
                                            href="/login"
                                            className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 block rounded-md px-3 py-2.5 text-center text-sm font-medium transition-all duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </PopoverContent>
                    </Popover>

                    {/* Main nav */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-primary hover:text-primary/80 transition-colors duration-200">
                            <Logo />
                        </Link>

                        {/* Navigation menu */}
                        <NavigationMenu className="max-md:hidden">
                            <NavigationMenuList className="gap-1">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    'relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                                                    isActiveLink(link.href)
                                                        ? 'text-primary bg-primary/5'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                                                )}
                                            >
                                                {link.label}
                                                {isActiveLink(link.href) && (
                                                    <span className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full" />
                                                )}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Shopping Cart Component */}
                    <ShoppingCartComponent
                        totalPrice={totalPrice}
                        totalQuantity={totalQuantity}
                        cartItems={actualCartItems}
                    />

                    {isAuthenticated ? (
                        /* User menu for authenticated users */
                        <UserMenu />
                    ) : (
                        /* Authentication buttons for non-authenticated users */
                        <div className="flex items-center gap-2 max-sm:hidden">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="h-9 font-medium">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="h-9 font-medium shadow-sm">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
