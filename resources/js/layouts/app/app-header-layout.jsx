import { AppContent } from '@/components/app-content';
// import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import Navbar from '@/components/app/Navbar';

export default function AppHeaderLayout({ children, breadcrumbs }) {
    return (
        <AppShell>
            {/* <AppHeader breadcrumbs={breadcrumbs} /> */}
            <Navbar/>
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
