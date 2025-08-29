import CurrencyFormatter from '@/components/app/CurrencyFormatter';
import ProductCarousel from '@/components/app/ProductCarousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app/app-header-layout';
import { arraysAreEqual } from '@/lib/utils.js';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const show = ({ product, variationOptions }) => {
    const form = useForm({
        option_ids: {},
        quantity: 1,
        variations: null,
    });

    const { url } = usePage();
    const [selectedOptions, setSelectedOptions] = useState({});

    const images = useMemo(() => {
        for (let typeId in selectedOptions) {
            const option = selectedOptions[typeId];
            if (option?.images?.length > 0) {
                return option.images;
            }
        }
        return product.images;
    }, [product, selectedOptions]);

    // Calculate price and quantity based on selected variations
    const computedProduct = useMemo(() => {
        const selectedOptionIds = Object.values(selectedOptions)
            .map((opt) => opt.id)
            .sort();

        for (let variation of product.variations) {
            const optionIds = variation.variation_type_option_ids.sort();
            if (arraysAreEqual(selectedOptionIds, optionIds)) {
                return {
                    price: variation.price,
                    quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
                };
            }
        }

        return { price: product.price, quantity: product.quantity };
    }, [product, selectedOptions]);

    // Initialize selected options on component mount
    useEffect(() => {
        for (let type of product.variationTypes) {
            const selectedOptionId = variationOptions[type.id];
            const selectedOption = type.options.find((opt) => opt.id == selectedOptionId) || type.options[0];
            chooseOption(type.id, selectedOption, false);
        }
    }, []);

    // Helper to create option IDs map - only include options for valid variation types
    const getOptionIdsMap = (newOptions) => {
        const optionIds = {};
        // Only include options for variation types that exist in the product
        product.variationTypes.forEach((type, index) => {
            if (newOptions[type.id]) {
                optionIds[index] = newOptions[type.id].id;
            }
        });
        return optionIds;
    };

    // Handle option selection and URL updates
    const chooseOption = (typeId, option, updateRouter = true) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newOptions = {
                ...prevSelectedOptions,
                [typeId]: option,
            };

            if (updateRouter) {
                const optionIds = getOptionIdsMap(newOptions);
                const queryParams = {};

                // Only add options that should be in URL
                Object.entries(optionIds).forEach(([typeId, optionId]) => {
                    queryParams[`options[${typeId}]`] = optionId;
                });

                router.get(url, queryParams, {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                    only: ['product'], // Only reload product data, not the entire page
                });
            }

            return newOptions;
        });
    };

    // Handle quantity changes
    const handleQuantityChange = (delta) => {
        const newQuantity = Math.max(1, Math.min(computedProduct.quantity, form.data.quantity + delta));
        form.setData('quantity', newQuantity);
    };

    // Handle add to cart
    const addToCart = (e) => {
        e.preventDefault();
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
            },
        });
    };

    // Render product variation types
    const renderProductVariationTypes = () => {
        return (
            <>
                {product.variationTypes.map((type) => (
                    <div key={type.id} className="space-y-4">
                        <Label className="text-sm font-medium text-gray-900 dark:text-white">{type.name}</Label>

                        {type.type === 'image' && (
                            <div className="flex flex-wrap gap-3">
                                {type.options.map((option) => (
                                    <div key={option.id} className="relative">
                                        <Button
                                            variant="ghost"
                                            className={`h-20 w-20 rounded-xl border-2 p-1 transition-all hover:scale-105 hover:shadow-md ${
                                                selectedOptions[type.id]?.id === option.id
                                                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800'
                                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                chooseOption(type.id, option);
                                            }}
                                            title={option.name}
                                        >
                                            {option.images?.length > 0 && (
                                                <img
                                                    src={option.images[0].thumb}
                                                    alt={option.name}
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            )}
                                        </Button>
                                        {selectedOptions[type.id]?.id === option.id && (
                                            <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
                                                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <p className="mt-2 max-w-20 truncate text-center text-xs text-gray-600 dark:text-gray-400">{option.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {type.type === 'radio' && (
                            <RadioGroup
                                value={selectedOptions[type.id]?.id?.toString()}
                                onValueChange={(value) => {
                                    const option = type.options.find((opt) => opt.id == value);
                                    if (option) chooseOption(type.id, option);
                                }}
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    {type.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                                                selectedOptions[type.id]?.id === option.id
                                                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 dark:bg-blue-950 dark:ring-blue-800'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800'
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                chooseOption(type.id, option);
                                            }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                                                <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                                                    <span className="text-sm font-medium">{option.name}</span>
                                                    {option.description && (
                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{option.description}</p>
                                                    )}
                                                </Label>
                                            </div>
                                            {selectedOptions[type.id]?.id === option.id && (
                                                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        )}
                    </div>
                ))}
            </>
        );
    };

    // Update form data when options change
    useEffect(() => {
        const idsMap = getOptionIdsMap(selectedOptions);
        form.setData('option_ids', idsMap);
    }, [selectedOptions]);

    return (
        <AppLayout>
            <Head title={product.title} />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-10 lg:flex-row">
                    {/* Images */}
                    <ProductCarousel images={images} />

                    {/* Product Details */}
                    <div className="flex flex-col space-y-8 lg:w-1/2">
                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-3xl leading-tight font-bold text-gray-900 dark:text-gray-100">{product.title}</h1>
                            <div className="mt-3 flex items-center">
                                <div className="flex items-center gap-2">
                                    <Package className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    {computedProduct.quantity === Number.MAX_VALUE ? (
                                        <Badge
                                            variant="outline"
                                            className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
                                        >
                                            In Stock
                                        </Badge>
                                    ) : computedProduct.quantity > 20 ? (
                                        <Badge
                                            variant="outline"
                                            className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
                                        >
                                            {computedProduct.quantity} Available
                                        </Badge>
                                    ) : computedProduct.quantity > 5 ? (
                                        <Badge
                                            variant="outline"
                                            className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                                        >
                                            {computedProduct.quantity} Left
                                        </Badge>
                                    ) : computedProduct.quantity > 0 ? (
                                        <Badge
                                            variant="outline"
                                            className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                                        >
                                            Only {computedProduct.quantity} Left
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900/20 dark:text-gray-300"
                                        >
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                <CurrencyFormatter amount={computedProduct.price} />
                            </span>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                        <Separator className="my-6 border-gray-200 dark:border-gray-700" />

                        {/* Variations */}
                        <div className="space-y-6">{renderProductVariationTypes()}</div>

                        <Separator className="my-6 border-gray-200 dark:border-gray-700" />

                        {/* Quantity + Actions */}
                        <div className="space-y-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                {/* Quantity */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Quantity</Label>
                                    <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-12 w-12 rounded-l-xl hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={form.data.quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                                        </Button>
                                        <div className="flex-1 px-4 text-center">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">{form.data.quantity}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-12 w-12 rounded-r-xl hover:bg-gray-50 dark:hover:bg-gray-800"
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={form.data.quantity >= computedProduct.quantity}
                                        >
                                            <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Add to Cart */}
                                <Button
                                    className="h-12 w-full bg-blue-600 text-white hover:bg-blue-700 sm:flex-1"
                                    onClick={addToCart}
                                    disabled={computedProduct.quantity === 0}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    {computedProduct.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                            </div>

                            {/* Buy Now */}
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 w-full border-2 border-gray-200 font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                                disabled={computedProduct.quantity === 0}
                            >
                                {computedProduct.quantity === 0 ? 'Currently Unavailable' : 'Buy Now'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default show;
