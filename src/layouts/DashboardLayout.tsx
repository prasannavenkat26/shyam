import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  Home,
  TrendingUp,
  Leaf,
  Award,
  MessageSquare,
  User,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { cn } from '../lib/utils';
import NotificationCenter from '../components/dashboard/NotificationCenter';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
  }>;
  role: 'user' | 'collector' | 'recycler';
}

export function DashboardLayout({ children, sidebarItems, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = () => {
    if (!state.user) return 'U';
    return (state.user.firstName[0] + state.user.lastName[0]).toUpperCase();
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : 0 }}
        className={cn(
          'fixed md:relative top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950',
          'border-r border-slate-800 pt-8 transition-all duration-300',
          !sidebarOpen && 'hidden md:block md:w-20'
        )}
      >
        {/* Logo */}
        <div className="px-6 pb-8 mb-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center"
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  ReLink
                </div>
                <div className="text-xs text-slate-400 capitalize">{role}</div>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3">
          {sidebarItems.map((item, i) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={i} to={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all',
                    'hover:bg-slate-800 group',
                    isActive && 'bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950'
                  )}
                >
                  <div className={isActive ? 'text-slate-950' : 'text-slate-400'}>{item.icon}</div>
                  {sidebarOpen && (
                    <span className={cn('text-sm font-medium', isActive ? 'text-slate-950' : '')}>
                      {item.label}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="px-3 py-4 border-t border-slate-800">
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-all"
          >
            <Settings className="w-4 h-4" />
            {sidebarOpen && <span className="text-sm">Settings</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors md:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="hidden md:block text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <NotificationCenter />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={state.user?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-600">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium">
                        {state.user?.firstName} {state.user?.lastName}
                      </div>
                      <div className="text-xs text-slate-400">{state.user?.email}</div>
                    </div>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.nav>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
