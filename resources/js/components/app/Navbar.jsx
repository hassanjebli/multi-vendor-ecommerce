import Logo from "@/components/navbar-components/logo"
import UserMenu from "@/components/navbar-components/user-menu"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, usePage } from "@inertiajs/react"
import { ShoppingCart, X, Trash2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

// Dummy cart data
const dummyCartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 149.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop"
  }
]

export default function Navbar() {
  const { url } = usePage();
  const isAuthenticated = usePage().props.auth.user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Calculate cart totals
  const cartItemCount = dummyCartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = dummyCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Check if link is active
  const isActiveLink = (href) => {
    if (href === "/") {
      return url === "/";
    }
    return url.startsWith(href);
  };
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
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
                      "px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 relative",
                      isActiveLink(link.href)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isActiveLink(link.href) && (
                      <span className="absolute left-1 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                    )}
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="pt-3 mt-3 border-t border-border space-y-1">
                    <Link
                      href="/login"
                      className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-all duration-200 text-center"
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
                          "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative",
                          isActiveLink(link.href)
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        {link.label}
                        {isActiveLink(link.href) && (
                          <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
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
          {isAuthenticated ? (
            <>
              {/* Shopping Cart with Badge */}
              <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative h-9 w-9 hover:bg-accent transition-colors duration-200"
                    aria-label={`Shopping cart with ${cartItemCount} items`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium shadow-sm animate-in zoom-in-50 duration-200">
                        {cartItemCount > 9 ? '9+' : cartItemCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-84 p-0 shadow-lg" sideOffset={8}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-base">Shopping Cart</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setIsCartOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {dummyCartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground text-sm">Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
                          {dummyCartItems.map((item) => (
                            <div key={item.id} className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-md shadow-sm"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  ${item.price.toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-4 mt-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Subtotal:</span>
                            <span className="font-bold text-lg">
                              ${cartSubtotal.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setIsCartOpen(false)}
                            >
                              <Link href="/cart" className="flex-1">
                                View Cart
                              </Link>
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => setIsCartOpen(false)}
                            >
                              <Link href="/checkout" className="flex-1">
                                Checkout
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* User menu */}
              <UserMenu />
            </>
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
  )
}