import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  Truck, 
  Gift, 
  AlertCircle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

const notifications = [
  {
    id: 1,
    title: 'Pickup Completed',
    message: 'Your request REQ-001 has been successfully processed.',
    time: '2 hours ago',
    type: 'success',
    icon: CheckCircle2,
    unread: true
  },
  {
    id: 2,
    title: 'Collector Assigned',
    message: 'John Doe is on his way to your location for REQ-002.',
    time: '5 hours ago',
    type: 'info',
    icon: Truck,
    unread: true
  },
  {
    id: 3,
    title: 'Rewards Earned!',
    message: 'You just earned 450 points for your last recycling request.',
    time: '1 day ago',
    type: 'reward',
    icon: Gift,
    unread: false
  }
];

const typeStyles = {
  success: 'text-emerald-400 bg-emerald-500/10',
  info: 'text-blue-400 bg-blue-500/10',
  reward: 'text-purple-400 bg-purple-500/10',
  alert: 'text-amber-400 bg-amber-500/10'
};

export default function NotificationCenter() {
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors group"
        >
          <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 border-2 border-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-800 p-0 overflow-hidden shadow-2xl">
        <DropdownMenuLabel className="p-4 flex items-center justify-between bg-slate-950/50">
          <span className="text-white font-bold">Notifications</span>
          <Badge variant="outline" className="text-[10px] border-emerald-500/50 text-emerald-400">
            {unreadCount} New
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-800 m-0" />
        
        <ScrollArea className="h-[350px]">
          <div className="divide-y divide-slate-800">
            {notifications.map((notif) => (
              <DropdownMenuItem 
                key={notif.id} 
                className="p-4 flex gap-4 cursor-pointer focus:bg-slate-800/50 transition-colors"
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${typeStyles[notif.type as keyof typeof typeStyles]}`}>
                  <notif.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-bold ${notif.unread ? 'text-white' : 'text-slate-400'}`}>
                      {notif.title}
                    </p>
                    {notif.unread && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-600">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
        
        <DropdownMenuSeparator className="bg-slate-800 m-0" />
        <div className="p-2 bg-slate-950/50">
          <button className="w-full py-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors text-center">
            Mark all as read
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
