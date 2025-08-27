import ProductItem from '@/components/app/ProductItem';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Play, Star } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home({ products }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Home" />
            <AppLayout breadcrumbs={breadcrumbs}>
                {/* Hero Section - Now extends beyond container */}
                <section className="relative -mx-6 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 lg:-mx-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

                    {/* Floating Elements */}
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-pink-400/20 to-orange-600/20 blur-3xl"></div>

                    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                        <div className="mx-auto max-w-4xl text-center">
                            {/* Main Heading */}
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
                                Discover Your
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {' '}
                                    Perfect Style
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
                                Shop the latest trends in fashion, electronics, and lifestyle products. Curated collections from top brands with
                                unbeatable prices and premium quality.
                            </p>

                            {/* Stats */}
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-400">4.9/5 from 12,000+ reviews</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-gray-600 dark:text-gray-400">Over 1M+ happy customers</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link href="/shop">
                                    <Button
                                        size="lg"
                                        className="transform bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                                    >
                                        Start Shopping
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Watch Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                {products.data.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.data.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 mb-8 flex items-center justify-center">
                        <Card className="w-full max-w-md bg-gray-50 text-center shadow-md dark:bg-gray-900">
                            <CardHeader>
                                <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                                <CardTitle className="mt-2 text-lg font-semibold">No Products Found</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                    We couldn’t find any products at the moment. Please check back later or explore other categories.
                                </CardDescription>
                                <Badge className="mt-4 px-4 py-2">Explore Categories</Badge>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </AppLayout>
        </>
    );
}
