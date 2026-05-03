import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Gift, 
  ShoppingBag, 
  Coffee, 
  Leaf, 
  ArrowRight,
  TrendingUp,
  Zap,
  Globe
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const rewards = [
  {
    id: 1,
    title: 'Amazon Gift Card',
    description: 'Get $25 credit for your next purchase.',
    points: 2500,
    category: 'Voucher',
    icon: ShoppingBag,
    color: 'from-orange-400 to-yellow-500'
  },
  {
    id: 2,
    title: 'Starbucks Coffee',
    description: 'Redeem for any grande handcrafted beverage.',
    points: 500,
    category: 'Food & Drink',
    icon: Coffee,
    color: 'from-green-600 to-emerald-700'
  },
  {
    id: 3,
    title: 'Eco-Friendly T-Shirt',
    description: '100% organic cotton ReLink branded tee.',
    points: 1500,
    category: 'Merchandise',
    icon: Leaf,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 4,
    title: 'Plant a Tree',
    description: 'Donate your points to plant a tree in the Amazon.',
    points: 1000,
    category: 'Donation',
    icon: Globe,
    color: 'from-emerald-500 to-green-600'
  }
];

export default function RedeemRewards() {
  const userPoints = 2450;
  
  const handleRedeem = (reward: any) => {
    if (userPoints >= reward.points) {
      toast.success(`Redeemed ${reward.title}! Check your email for details.`);
    } else {
      toast.error(`Not enough points. You need ${reward.points - userPoints} more points.`);
    }
  };

  const sidebarItems = [
    { label: 'Dashboard', icon: <Leaf className="w-5 h-5" />, href: '/dashboard' },
    { label: 'My Pickups', icon: <Award className="w-5 h-5" />, href: '/dashboard/pickups' },
    { label: 'Rewards', icon: <Gift className="w-5 h-5" />, href: '/dashboard/rewards' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="user">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
                Your Balance
              </Badge>
              <h1 className="text-5xl font-bold text-white">
                {userPoints.toLocaleString()} <span className="text-2xl font-normal text-slate-400">Points</span>
              </h1>
              <p className="text-slate-400 max-w-md">
                You're just 50 points away from your next milestone! Keep recycling to unlock premium rewards.
              </p>
            </div>
            
            <div className="w-full md:w-72 space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Next Milestone</span>
                <span className="text-emerald-400 font-bold">2,500 Pts</span>
              </div>
              <Progress value={(userPoints/2500)*100} className="h-2 bg-slate-800" />
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-semibold">
                Tier: Green Guardian
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Lifetime Earned', value: '12,450', icon: TrendingUp },
            { label: 'Rewards Claimed', value: '14', icon: Award },
            { label: 'Active Boosters', value: '2x Eco-Day', icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-slate-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, i) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full bg-slate-900 border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col">
                  <div className={`h-32 bg-gradient-to-br ${reward.color} flex items-center justify-center`}>
                    <reward.icon className="w-12 h-12 text-white drop-shadow-lg" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                        {reward.category}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {reward.points} Pts
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{reward.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1">{reward.description}</p>
                    <Button 
                      onClick={() => handleRedeem(reward)}
                      disabled={userPoints < reward.points}
                      className={`w-full ${userPoints >= reward.points ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-800'} text-white`}
                    >
                      {userPoints >= reward.points ? 'Redeem Now' : 'Not Enough Points'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners Banner */}
        <div className="p-10 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Want more rewards?</h3>
          <p className="text-slate-400 mb-6">Our partners are constantly adding new eco-friendly incentives.</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            {/* Mock partner logos placeholders */}
            <div className="text-2xl font-black text-white italic">ECOWAVE</div>
            <div className="text-2xl font-black text-white italic">GREENTECH</div>
            <div className="text-2xl font-black text-white italic">EARTHBIZ</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
