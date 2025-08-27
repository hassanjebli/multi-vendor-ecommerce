import { SidebarInset } from '@/components/ui/sidebar';

export function AppContent({ variant = 'header', children, ...props }) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
      className="mx-auto flex h-full w-full flex-1 flex-col gap-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
      {...props}
    >
      {children}
    </main>
    );
}
