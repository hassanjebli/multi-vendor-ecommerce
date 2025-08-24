import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Shop',
        href: '/shop',
    },
];

export default function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Home" />
            <AppLayout breadcrumbs={breadcrumbs}>
            </AppLayout>
        </>
    );
}
