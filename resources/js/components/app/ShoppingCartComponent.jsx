import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export default function ShoppingCartComponent({ totalPrice, totalQuantity, cartItems = [] }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent relative h-9 w-9 transition-colors duration-200"
                    aria-label={`Shopping cart with ${totalQuantity} items`}
                >
                    <ShoppingCart className="h-5 w-5" />
                    {totalQuantity > 0 && (
                        <span className="bg-primary text-primary-foreground animate-in zoom-in-50 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium shadow-sm duration-200">
                            {totalQuantity > 9 ? '9+' : totalQuantity}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-84 p-0 shadow-lg" sideOffset={8}>
                <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold">Shopping Cart</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm">
                                {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                            </span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsCartOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="py-8 text-center">
                            <ShoppingCart className="text-muted-foreground/50 mx-auto mb-3 h-12 w-12" />
                            <p className="text-muted-foreground text-sm">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="scrollbar-thin max-h-64 space-y-3 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group hover:bg-accent/50 flex items-center space-x-3 rounded-lg p-3 transition-colors duration-200"
                                    >
                                        <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover shadow-sm" />
                                        <div className="min-w-0 flex-1">
                                            <h4 className="truncate text-sm font-medium">{item.name}</h4>
                                            <p className="text-muted-foreground mt-0.5 text-xs">
                                                ${item.price.toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                            >
                                                <Trash2 className="text-destructive h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 space-y-4 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setIsCartOpen(false)}>
                                        <Link href="/cart" className="flex-1">
                                            View Cart
                                        </Link>
                                    </Button>
                                    <Button size="sm" onClick={() => setIsCartOpen(false)}>
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
    );
}
