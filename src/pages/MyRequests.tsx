import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  Smartphone,
  Info
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';
import { cn } from '../lib/utils';

// Mock data for requests
const mockRequests = [
  {
    id: 'REQ-001',
    status: 'completed',
    date: 'Dec 15, 2024',
    time: '02:00 PM - 04:00 PM',
    devices: [
      { name: 'MacBook Pro', category: 'Laptop', condition: 'not-working' },
      { name: 'iPhone 12', category: 'Mobile', condition: 'partially-working' }
    ],
    address: '123 Eco Street, Green City',
    rewardPoints: 450,
    collector: 'John Doe',
  },
  {
    id: 'REQ-002',
    status: 'in-transit',
    date: 'Dec 20, 2024',
    time: '10:00 AM - 12:00 PM',
    devices: [
      { name: 'Dell Monitor', category: 'Peripheral', condition: 'working' }
    ],
    address: '456 Tech Park, Digital Valley',
    rewardPoints: 150,
    collector: 'Jane Smith',
  },
  {
    id: 'REQ-003',
    status: 'scheduled',
    date: 'Dec 25, 2024',
    time: '04:00 PM - 06:00 PM',
    devices: [
      { name: 'Samsung Galaxy Tab', category: 'Tablet', condition: 'not-working' }
    ],
    address: '789 Sustainability Way, Nature Heights',
    rewardPoints: 200,
    collector: 'Pending Assignment',
  }
];

const statusConfig = {
  completed: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
  'in-transit': { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Truck },
  scheduled: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Clock3 },
  cancelled: { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle },
};

export default function MyRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', icon: <Package className="w-5 h-5" />, href: '/dashboard' },
    { label: 'My Pickups', icon: <Smartphone className="w-5 h-5" />, href: '/dashboard/pickups' },
    { label: 'Rewards', icon: <Info className="w-5 h-5" />, href: '/dashboard/rewards' },
  ];

  const filteredRequests = mockRequests.filter(req => 
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.devices.some(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewDetails = (req: any) => {
    setSelectedRequest(req);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="user">
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">My Pickup Requests</h1>
            <p className="text-slate-400">Track and manage your e-waste contributions</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            Schedule New Pickup
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by ID or device..." 
              className="pl-10 bg-slate-900/50 border-slate-700 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Filter className="w-4 h-4 mr-2" />
            Filter Status
          </Button>
        </div>

        {/* Requests List */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredRequests.map((req, idx) => {
              const Config = statusConfig[req.status as keyof typeof statusConfig];
              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative glass p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer"
                  onClick={() => handleViewDetails(req)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-xl", Config.color)}>
                        <Config.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-lg text-white">{req.id}</h3>
                          <Badge variant="outline" className={cn("capitalize", Config.color)}>
                            {req.status}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {req.devices.map(d => d.name).join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:flex lg:items-center gap-6 lg:gap-12">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                        <p className="text-white font-medium">{req.date}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          Timeslot
                        </div>
                        <p className="text-white font-medium text-xs md:text-sm">{req.time}</p>
                      </div>
                      <div className="hidden md:block space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          Points
                        </div>
                        <p className="text-white font-bold">{req.rewardPoints}</p>
                      </div>
                      <Button variant="ghost" className="hidden lg:flex group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
                        Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Request Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                Request Details: {selectedRequest?.id}
                <Badge variant="outline" className={cn("capitalize", selectedRequest && statusConfig[selectedRequest.status as keyof typeof statusConfig]?.color)}>
                  {selectedRequest?.status}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Full summary of your e-waste pickup request.
              </DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div className="grid md:grid-cols-2 gap-8 py-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Items for Recycling</h4>
                    <div className="space-y-2">
                      {selectedRequest.devices.map((device: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div>
                            <p className="font-medium text-white">{device.name}</p>
                            <p className="text-xs text-slate-400">{device.category}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px] uppercase">
                            {device.condition.replace('-', ' ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Total Rewards</span>
                      <span className="text-2xl font-bold text-emerald-400">{selectedRequest.rewardPoints} Pts</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Logistics</h4>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Pickup Address</p>
                          <p className="text-xs text-slate-400">{selectedRequest.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Scheduled For</p>
                          <p className="text-xs text-slate-400">{selectedRequest.date} at {selectedRequest.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Package className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Collector</p>
                          <p className="text-xs text-slate-400">{selectedRequest.collector}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-400" disabled={selectedRequest.status === 'completed'}>
                      Cancel Request
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
