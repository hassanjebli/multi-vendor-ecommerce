'use client';
import CurrencyFormatter from '@/components/app/CurrencyFormatter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Eye, HeartIcon, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative max-w-md rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 pt-0 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-gray-800 dark:to-gray-900">
            {/* Product Image Container */}
            <div className="group/image relative flex h-60 items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-2 h-12 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                            <span className="text-sm">No Image</span>
                        </div>
                    </div>
                )}

                {/* Stock Status Badges */}
                {product.quantity === 0 && (
                    <Badge className="absolute top-4 left-4 bg-red-500/90 text-xs text-white backdrop-blur-sm">Sold Out</Badge>
                )}
                {product.quantity > 0 && product.quantity <= 5 && (
                    <Badge className="absolute top-4 left-4 bg-amber-500/90 text-xs text-white backdrop-blur-sm">{product.quantity} left</Badge>
                )}

                {/* Quick View Overlay */}
                <Link
                    href={route('products.show', { slug: product.slug })}
                    aria-label={`View product ${product.name}`} // Optional but useful for accessibility
                    className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover/image:bg-black/10"
                >
                    <Button
                        size="sm"
                        variant="secondary"
                        className="flex scale-90 items-center bg-white/95 opacity-0 transition-all duration-200 group-hover/image:scale-100 group-hover/image:opacity-100 hover:bg-white dark:bg-gray-900/95 dark:hover:bg-gray-900"
                    >
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        View
                    </Button>
                </Link>
            </div>

            {/* Wishlist Heart Button */}
            <Button size="icon" className="bg-primary/10 hover:bg-primary/20 absolute end-4 top-4 rounded-full backdrop-blur-sm">
                <HeartIcon className="size-4 stroke-white" />
                <span className="sr-only">Like</span>
            </Button>

            <Card className="rounded-t-none border-none">
                <CardHeader className="pb-2">
                    {/* Category & Department Tags */}
                    {(product.category || product.department) && (
                        <CardDescription className="mb-2 flex items-center gap-2">
                            {product.category && (
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
                                >
                                    {product.category.name}
                                </Badge>
                            )}
                            {product.department && (
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                >
                                    {product.department.name}
                                </Badge>
                            )}
                        </CardDescription>
                    )}

                    <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>

                    {/* Seller Info */}
                    <CardDescription className="flex items-center gap-2">
                        <div className="group/seller flex cursor-pointer items-center gap-1.5">
                            <Avatar className="h-5 w-5 border border-gray-200 dark:border-gray-700">
                                <AvatarImage src={product.user.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-medium text-white">
                                    {product.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="max-w-24 truncate text-sm text-gray-600 transition-colors group-hover/seller:text-gray-900 dark:text-gray-400 dark:group-hover/seller:text-gray-200">
                                {product.user.name}
                            </span>
                        </div>
                    </CardDescription>
                </CardHeader>

                <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600 uppercase dark:text-gray-400">Price</span>
                        <span className="text-2xl font-semibold">
                            <CurrencyFormatter amount={product.price} />
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                <CurrencyFormatter amount={product.originalPrice} />
                            </span>
                        )}
                    </div>

                    <Button
                        size="lg"
                        disabled={product.quantity === 0}
                        className={`transition-all duration-200 ${
                            product.quantity === 0
                                ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-md'
                        }`}
                    >
                        {product.quantity === 0 ? (
                            'Sold Out'
                        ) : (
                            <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to cart
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductCard;
