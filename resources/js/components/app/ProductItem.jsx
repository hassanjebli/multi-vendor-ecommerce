import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

const ProductItem = ({ product }) => {
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add to cart logic here
        console.log('Adding product to cart:', product.id);
    };

    return (
        <Card className="w-full max-w-sm overflow-hidden transition-shadow hover:shadow-lg">
            {/* Product Image - Clickable */}
            <Link href={route('products.show', { slug: product.slug })} className="block">
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-600">
                            <span className="text-sm">No Image</span>
                        </div>
                    )}

                    {/* Stock Status Badge */}
                    {product.quantity === 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            Out of Stock
                        </Badge>
                    )}
                    {product.quantity > 0 && product.quantity <= 5 && (
                        <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                            {product.quantity} left
                        </Badge>
                    )}
                </div>
            </Link>

            <CardHeader className="pb-2">
                {/* Category and Department */}
                <div className="flex gap-2 mb-2">
                    {product.category && (
                        <Link href={route('categories.show', { slug: product.category.slug })}>
                            <Badge variant="outline" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                                {product.category.name}
                            </Badge>
                        </Link>
                    )}
                    {product.department && (
                        <Link href='/'>
                            <Badge variant="outline" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                                {product.department.name}
                            </Badge>
                        </Link>
                    )}
                </div>

                {/* Product Title - Clickable */}
                <Link href={route('products.show', { slug: product.slug })}>
                    <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                        {product.title}
                    </CardTitle>
                </Link>

                {/* Seller - Clickable */}
                <Link href={'/'}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                        by {product.user.name}
                    </p>
                </Link>
            </CardHeader>

            <CardContent className="pt-0">
                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ${product.price}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    className="w-full"
                    disabled={product.quantity === 0}
                    onClick={handleAddToCart}
                >
                    {product.quantity === 0 ? (
                        'Out of Stock'
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductItem;
