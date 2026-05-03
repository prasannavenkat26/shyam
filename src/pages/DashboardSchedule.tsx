import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarClock, 
  MapPin, 
  Smartphone, 
  Leaf, 
  Award, 
  Zap,
  Info
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

export default function DashboardSchedule() {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Leaf className="w-5 h-5" />, href: '/dashboard' },
    { label: 'My Pickups', icon: <Smartphone className="w-5 h-5" />, href: '/dashboard/pickups' },
    { label: 'Schedule', icon: <CalendarClock className="w-5 h-5" />, href: '/dashboard/schedule' },
    { label: 'Rewards', icon: <Award className="w-5 h-5" />, href: '/dashboard/rewards' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="user">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Schedule a Pickup</h1>
          <p className="text-slate-400">Tell us what you have, and we'll send a collector to your doorstep.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass p-8 rounded-3xl border border-slate-800 space-y-6"
          >
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Pickup scheduled successfully! Track it in 'My Pickups'."); }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Contact Name</Label>
                  <Input placeholder="John Doe" className="bg-slate-900 border-slate-700" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Phone Number</Label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-slate-900 border-slate-700" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Pickup Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  <Input placeholder="123 Sustainability Way, Eco City" className="pl-10 bg-slate-900 border-slate-700" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Preferred Date</Label>
                  <Input type="date" className="bg-slate-900 border-slate-700" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Device Category</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800">
                      <SelectItem value="mobile">Mobile / Tablet</SelectItem>
                      <SelectItem value="laptop">Laptop / Desktop</SelectItem>
                      <SelectItem value="appliance">Home Appliances</SelectItem>
                      <SelectItem value="battery">Batteries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Device Details & Quantity</Label>
                <Textarea placeholder="e.g. 2 broken Dell laptops, 1 cracked iPhone 8..." className="bg-slate-900 border-slate-700 h-32" />
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                Confirm & Schedule
              </Button>
            </form>
          </motion.div>

          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4"
            >
              <div className="flex items-center gap-3 text-emerald-400">
                <Zap className="w-5 h-5" />
                <h3 className="font-bold">Eco Tip</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Make sure to remove any personal storage or SD cards before recycling. We also provide secure data destruction services upon request.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <h3 className="font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" />
                Pickup Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Service Fee</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Avg. ETA</span>
                  <span className="text-white">24-48 Hours</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Points Earned</span>
                  <span className="text-white">Up to 500 Pts</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
