import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Leaf,
  LogOut,
  MessageCircle,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const { state, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = () => {
    if (!state.user) return 'U';
    return (state.user.firstName[0] + state.user.lastName[0]).toUpperCase();
  };

  const navItems = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const moreItems = [
    { label: 'Services', href: '/services' },
    { label: 'Recyclers', href: '/recyclers' },
    { label: 'Health Monitoring', href: '/health-monitoring' },
    { label: 'Appointments', href: '/appointments' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950 to-slate-950/80 backdrop-blur-md border-b border-slate-800/50 dark:from-slate-950 dark:to-slate-950/80 light:from-white light:to-white/80"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center"
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              ReLink
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-emerald-400'
                    : 'text-slate-300 hover:text-emerald-400 dark:text-slate-300 light:text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-medium px-3 py-2 rounded-lg transition-colors text-slate-300 hover:text-emerald-400 dark:text-slate-300 light:text-slate-600 bg-slate-800/80 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200">
                  More <ChevronDown className="ml-1 inline-block" size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44 bg-slate-950 dark:bg-slate-950 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200">
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* AI Assistant Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAIChat(!showAIChat)}
              className="p-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-emerald-400 transition-colors"
              title="AI Assistant"
            >
              <MessageCircle size={18} />
            </motion.button>

            {state.isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hidden sm:flex">
                  <Button
                    variant="ghost"
                    className="text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 transition-colors"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={state.user?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-600 text-xs">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium text-white dark:text-white light:text-slate-900">
                        {state.user?.firstName}
                      </span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200">
                    <DropdownMenuItem disabled className="text-slate-400 cursor-default text-xs">
                      {state.user?.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800 dark:bg-slate-800 light:bg-slate-200" />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/dashboard" className="text-white dark:text-white light:text-slate-900">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/dashboard" className="text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                        <Settings size={14} />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800 dark:bg-slate-800 light:bg-slate-200" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-400 dark:text-red-400 light:text-red-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:flex">
                  <Button
                    variant="ghost"
                    className="text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 rounded-lg transition-colors text-white dark:text-white light:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 p-4"
          >
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!state.isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* AI Assistant Chat Widget */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 light:from-white light:to-slate-50 border border-slate-700 dark:border-slate-700 light:border-slate-300 rounded-2xl shadow-2xl flex flex-col z-40 max-w-[calc(100vw-24px)]"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700 dark:border-slate-700 light:border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white dark:text-white light:text-slate-900">ReLink AI</p>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                  🤖
                </div>
                <div className="bg-slate-700 dark:bg-slate-700 light:bg-slate-100 rounded-lg p-3 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Hi! 👋 I'm your ReLink assistant. I can help you with:
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• E-waste recycling tips</li>
                    <li>• Scheduling pickups</li>
                    <li>• Tracking your impact</li>
                    <li>• Redeeming rewards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-700 dark:border-slate-700 light:border-slate-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-700 dark:bg-slate-700 light:bg-slate-100 border border-slate-600 dark:border-slate-600 light:border-slate-300 rounded-lg px-3 py-2 text-sm text-white dark:text-white light:text-slate-900 placeholder-slate-400 dark:placeholder-slate-400 light:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3">
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}

export default Navbar;
