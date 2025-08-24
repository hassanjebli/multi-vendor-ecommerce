import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Play, Star } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Home" />
            <AppLayout breadcrumbs={breadcrumbs}>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
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

                            {/* Trust Indicators */}
                            {/* <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
                                <div className="flex flex-col items-center rounded-2xl border border-gray-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Secure Payments</h3>
                                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                                        256-bit SSL encryption for all transactions
                                    </p>
                                </div>

                                <div className="flex flex-col items-center rounded-2xl border border-gray-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Free Shipping</h3>
                                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Free delivery on orders over $99</p>
                                </div>

                                <div className="flex flex-col items-center rounded-2xl border border-gray-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                        <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Easy Returns</h3>
                                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">30-day hassle-free return policy</p>
                                </div>
                            </div> */}
                        </div>

                        {/* Featured Product Preview */}
                        {/* <div className="mx-auto mt-20 max-w-5xl">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                                <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                                    <div className="text-white">
                                        <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">Featured Product</Badge>
                                        <h3 className="mb-4 text-3xl font-bold">Premium Collection 2024</h3>
                                        <p className="mb-6 text-lg text-gray-300">
                                            Experience the perfect blend of style, comfort, and innovation. Limited edition pieces that define modern
                                            luxury.
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl font-bold text-white">$299</span>
                                            <span className="text-lg text-gray-400 line-through">$449</span>
                                            <Badge variant="destructive">33% OFF</Badge>
                                        </div>
                                        <div className="mt-6">
                                            <Link href="/products/featured">
                                                <Button className="bg-white font-semibold text-gray-900 hover:bg-gray-100">
                                                    Shop Now
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                                            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-2xl">
                                                <span className="text-6xl font-bold text-white">?</span>
                                            </div>
                                        </div>
                                        <div className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 shadow-lg">
                                            <Star className="h-8 w-8 fill-current text-yellow-800" />
                                        </div>
                                        <div className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-400 shadow-lg">
                                            <CheckCircle className="h-6 w-6 text-green-800" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </AppLayout>
        </>
    );
}
