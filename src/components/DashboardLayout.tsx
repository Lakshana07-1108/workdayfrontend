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
  RotateCcw
} from 'lucide-react';
import { cn } from '../components/ui/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
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
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            WorkForce Pro
          </h2>
          <p className="text-sm text-sidebar-foreground/70">
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