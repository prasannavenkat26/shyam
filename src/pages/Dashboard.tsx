import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Package,
  Leaf,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Filter,
  Plus,
  ArrowRight,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { state } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  const sidebarItems = [
    { label: 'Dashboard', icon: <Leaf className="w-5 h-5" />, href: '/dashboard' },
    { label: 'My Pickups', icon: <Smartphone className="w-5 h-5" />, href: '/dashboard/pickups' },
    { label: 'Schedule', icon: <Plus className="w-5 h-5" />, href: '/dashboard/schedule' },
    { label: 'Rewards', icon: <Award className="w-5 h-5" />, href: '/dashboard/rewards' },
    { label: 'Impact', icon: <TrendingUp className="w-5 h-5" />, href: '/dashboard/impact' },
    { label: 'AI Assistant', icon: <Package className="w-5 h-5" />, href: '/dashboard/assistant' },
  ];

  const stats = [
    {
      icon: Smartphone,
      label: 'Devices Recycled',
      value: '24',
      change: '+4 this month',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Award,
      label: 'Reward Points',
      value: '2,450',
      change: '+150 this month',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Leaf,
      label: 'CO₂ Prevented',
      value: '1.2T',
      change: '+0.3T this month',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Eco Score',
      value: '8.4/10',
      change: '+1.2 this month',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const recentPickups = [
    {
      id: 1,
      date: 'Dec 15, 2024',
      devices: 3,
      points: 300,
      status: 'completed',
      category: 'Laptop, Phone, Monitor',
    },
    {
      id: 2,
      date: 'Dec 10, 2024',
      devices: 2,
      points: 200,
      status: 'completed',
      category: 'Desktop, Keyboard',
    },
    {
      id: 3,
      date: 'Dec 5, 2024',
      devices: 1,
      points: 100,
      status: 'completed',
      category: 'Tablet',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="user">
      <div className="space-y-8">
        {/* Welcome Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {state.user?.firstName}!
          </h1>
          <p className="text-slate-400">Keep recycling responsibly and earn more rewards</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:shadow-lg transition-all`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-emerald-400">{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/schedule">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 h-12">
                <Plus className="w-5 h-5 mr-2" />
                Schedule Pickup
              </Button>
            </Link>
            <Link to="/dashboard/rewards">
              <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 h-12">
                <Award className="w-5 h-5 mr-2" />
                Redeem Rewards
              </Button>
            </Link>
            <Link to="/dashboard/impact">
              <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 h-12">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Impact Report
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Recent Pickups Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recent Pickups</h2>
            <Button variant="outline" size="sm" className="border-slate-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-3">
            {recentPickups.map((pickup, i) => (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="p-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center"
                    >
                      <Calendar className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-white">{pickup.category}</p>
                      <p className="text-sm text-slate-400">{pickup.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400">{pickup.points} Points</p>
                    <p className="text-xs text-slate-400">{pickup.devices} devices</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Pickup CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Next Pickup Scheduled</h3>
              <p className="text-slate-300 text-sm">Tomorrow, 2:00 PM - 4:00 PM</p>
            </div>
            <Link to="/dashboard/pickups">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
