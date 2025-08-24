import Navbar from '@/components/app/Navbar';
import Logo from '@/components/navbar-components/logo';
import { Link, usePage } from '@inertiajs/react';

export default function AuthSplitLayout({ children, title, description }) {
    const { name } = usePage().props;

    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <div className="grid flex-1 overflow-hidden lg:grid-cols-2">
                {/* Left Side */}
                <div className="hidden lg:relative lg:flex">
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
                        alt="Auth illustration"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Right Side */}
                <div className="flex w-full flex-col justify-center px-6 sm:px-12 lg:px-16">
                    <div className="mx-auto w-full max-w-sm space-y-6">
                        {/* Mobile logo */}
                        <Link href={route('home')} className="flex justify-center lg:hidden">
                            <Logo className="h-10 text-black sm:h-12" />
                        </Link>

                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">{title}</h1>
                            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
                        </div>

                        {/* Auth form */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
