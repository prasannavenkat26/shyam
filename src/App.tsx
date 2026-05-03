import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from './components/ui/sonner';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { AuthProvider } from './context/AuthContext';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Collector from './pages/Collector';
import Admin from './pages/Admin';
import Pickup from './pages/Pickup';
import Rewards from './pages/Rewards';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Impact from './pages/Impact';
import About from './pages/About';
import HealthMonitoring from './pages/HealthMonitoring';
import Appointments from './pages/Appointments';
import Assistant from './pages/Assistant';
import Services from './pages/Services';
import Recyclers from './pages/Recyclers';
import MyRequests from './pages/MyRequests';
import RedeemRewards from './pages/RedeemRewards';
import DashboardSchedule from './pages/DashboardSchedule';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<Contact />} />

            {/* Authentication */}
            <Route path="/auth" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            {/* User Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/pickups" element={<MyRequests />} />
            <Route path="/dashboard/schedule" element={<DashboardSchedule />} />
            <Route path="/dashboard/rewards" element={<RedeemRewards />} />
            <Route path="/dashboard/impact" element={<Impact />} />
            <Route path="/dashboard/assistant" element={<Assistant />} />

            {/* Collector Dashboard */}
            <Route path="/collector" element={<Collector />} />
            <Route path="/collector/pickups" element={<Collector />} />
            <Route path="/collector/earnings" element={<Collector />} />

            {/* Admin/Recycler Dashboard */}
            <Route path="/recycler" element={<Admin />} />
            <Route path="/admin" element={<Admin />} />

            {/* Additional Pages */}
            <Route path="/pickup" element={<Pickup />} />
            <Route path="/recyclers" element={<Recyclers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/health-monitoring" element={<HealthMonitoring />} />
            <Route path="/appointments" element={<Appointments />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
