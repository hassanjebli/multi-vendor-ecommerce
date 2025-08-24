import { 
    BoltIcon, 
    BookOpenIcon, 
    CreditCardIcon,
    HeartIcon,
    HelpCircleIcon,
    HistoryIcon,
    LogOut, 
    SettingsIcon, 
    ShoppingBagIcon,
    UserIcon,
    BellIcon,
    ShieldCheckIcon
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { Link, usePage } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

export default function UserMenu() {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent group">
                    <Avatar className="size-8 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-200">
                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                        <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {getInitials(auth.user.name)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end" sideOffset={8}>
                {/* User Info Header */}
                <div className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-md">
                    <div className="flex items-center space-x-3">
                        <Avatar className="size-12 ring-2 ring-primary/20">
                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                            <AvatarFallback className="rounded-full bg-primary text-primary-foreground font-semibold">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                                {auth.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {auth.user.email}
                            </p>
                            <div className="flex items-center mt-1">
                                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                                    <ShieldCheckIcon size={12} />
                                    <span>Verified Account</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DropdownMenuSeparator className="my-0" />

                {/* Account Management */}
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer group p-3">
                        <UserIcon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <Link href={route('profile.edit')} className="flex-1">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">My Profile</span>
                                <span className="text-xs text-muted-foreground">Manage your account details</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    
                   
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                


                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem className="cursor-pointer group p-3 focus:bg-red-50 dark:focus:bg-red-950/20">
                    <LogOut size={16} className="text-red-500 group-hover:text-red-600 transition-colors" />
                    <Link 
                        method="post" 
                        href={route('logout')} 
                        as="button" 
                        onClick={cleanup}
                        className="flex-1 text-left"
                    >
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-red-600 dark:text-red-500">Sign Out</span>
                            <span className="text-xs text-red-500/70">See you again soon!</span>
                        </div>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}