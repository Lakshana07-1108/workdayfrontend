import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  DollarSign, 
  CheckSquare,
  Bell,
  BarChart3,
  Settings,
  Home,
  RotateCcw,
  User,
  LogOut
} from 'lucide-react';
import { cn } from '../components/ui/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { 
        href: '/dashboard', 
        label: 'Dashboard', 
        icon: Home, 
        roles: ['employee', 'manager', 'admin'] 
      },
    ];

    const employeeItems = [
      { href: '/dashboard/shifts', label: 'My Shifts', icon: Calendar, roles: ['employee'] },
      { href: '/dashboard/leave-requests', label: 'Leave Requests', icon: FileText, roles: ['employee'] },
      { href: '/dashboard/attendance', label: 'Attendance', icon: Clock, roles: ['employee'] },
      { href: '/dashboard/payslips', label: 'Payslips', icon: DollarSign, roles: ['employee'] },
      { href: '/dashboard/shift-swaps', label: 'Shift Swaps', icon: RotateCcw, roles: ['employee'] },
    ];

    const managerItems = [
      { href: '/dashboard/team-attendance', label: 'Team Attendance', icon: Clock, roles: ['manager', 'admin'] },
      { href: '/dashboard/approvals', label: 'Approvals', icon: CheckSquare, roles: ['manager', 'admin'] },
      { href: '/dashboard/payroll', label: 'Payroll', icon: DollarSign, roles: ['manager', 'admin'] },
      { href: '/dashboard/reports', label: 'Reports', icon: BarChart3, roles: ['manager', 'admin'] },
    ];

    const adminItems = [
      { href: '/dashboard/employees', label: 'Employee Management', icon: Users, roles: ['admin'] },
      { href: '/dashboard/shift-management', label: 'Shift Management', icon: Calendar, roles: ['admin'] },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
    ];

    const notificationItem = [
      { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, roles: ['employee', 'manager', 'admin'] },
    ];

    const allItems = [...baseItems, ...employeeItems, ...managerItems, ...adminItems, ...notificationItem];
    
    return allItems.filter(item => 
      user && item.roles.includes(user.role)
    );
  };

  const menuItems = getMenuItems();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <Link to="/" className="block">
            <h2 className="text-lg font-semibold text-sidebar-foreground hover:text-primary transition-colors">
              WorkForce Pro
            </h2>
          </Link>
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            {user?.name} • {user?.role}
          </p>
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10",
                    active 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Link to={item.href}>
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                    {item.label === 'Notifications' && (
                      <Badge variant="destructive" className="ml-auto">
                        3
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-12 px-3">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};