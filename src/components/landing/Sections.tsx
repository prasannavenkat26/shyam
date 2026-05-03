import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  MapPin,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Leaf,
  Users,
  Recycle,
  Truck,
  ShieldCheck,
  BarChart3,
  Heart,
  Globe,
  Droplet,
  Flame,
  Wind,
} from 'lucide-react';
import { Button } from '../ui/button';

// ===== FEATURES SECTION =====
const featuresList = [
  {
    icon: Smartphone,
    title: 'Easy Pickup Scheduling',
    description: 'Schedule hassle-free e-waste pickups from your home or office with flexible time slots.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Track your pickup requests in real-time and monitor the entire recycling process.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Award,
    title: 'Earn Rewards',
    description: 'Get rewarded with points for every e-waste item recycled. Redeem for exciting prizes.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Zap,
    title: 'Instant Verification',
    description: 'QR-based verification system ensures transparent and secure transactions at every step.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Certified Recyclers',
    description: 'Partner only with verified and certified e-waste recyclers following international standards.',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: TrendingUp,
    title: 'Impact Dashboard',
    description: 'Visualize your environmental contribution with detailed sustainability metrics and analytics.',
    color: 'from-cyan-500 to-blue-600',
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Everything you need to recycle responsibly
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            ReLink provides comprehensive tools to make e-waste recycling simple, transparent, and
            rewarding for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>

              {/* Accent */}
              <motion.div
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`h-1 mt-4 bg-gradient-to-r ${feature.color} rounded-full origin-left`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ===== HOW IT WORKS SECTION =====
const workSteps = [
  {
    icon: Smartphone,
    title: 'Schedule Pickup',
    description: 'Add devices and choose your preferred time slot on our mobile app.',
    step: '01',
  },
  {
    icon: Truck,
    title: 'Collector Arrives',
    description: 'A verified collector picks up your e-waste with QR verification.',
    step: '02',
  },
  {
    icon: Recycle,
    title: 'Safe Processing',
    description: 'Devices are safely processed by certified recyclers.',
    step: '03',
  },
  {
    icon: Award,
    title: 'Earn Rewards',
    description: 'Get reward points and track your environmental impact instantly.',
    step: '04',
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            From Doorstep to Circular Economy
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our streamlined process makes responsible e-waste recycling easier than ever.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 group hover:border-green-500/50 transition-all"
            >
              {/* Step Number */}
              <div className="absolute top-4 right-4 text-5xl font-bold text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
                {step.step}
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all"
              >
                <step.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>

              {/* Connector Line */}
              {index < workSteps.length - 1 && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-emerald-500 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ===== IMPACT SECTION =====
const impactStats = [
  { icon: Droplet, label: 'E-Waste Processed', value: '50K+ Tons', color: 'from-blue-500 to-blue-600' },
  { icon: Flame, label: 'Carbon Prevented', value: '5M Tons CO₂', color: 'from-orange-500 to-red-600' },
  { icon: Wind, label: 'Materials Recovered', value: '500K+ Tons', color: 'from-green-500 to-emerald-600' },
  { icon: Heart, label: 'Users Impacting', value: '100K+ Lives', color: 'from-pink-500 to-rose-600' },
];

export function Impact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Global Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Making a Real Environmental Difference
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join thousands of users creating a sustainable future through responsible e-waste recycling.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-teal-500/50 transition-all text-center group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Value */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* SDG Goals */}
        <motion.div variants={itemVariants} className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            Supporting UN Sustainable Development Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="font-semibold text-emerald-400 mb-2">Goal 11: Sustainable Cities & Communities</p>
              <p className="text-slate-400 text-sm">
                Building sustainable urban ecosystems by reducing e-waste in landfills.
              </p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="font-semibold text-emerald-400 mb-2">Goal 12: Responsible Consumption & Production</p>
              <p className="text-slate-400 text-sm">
                Promoting circular economy and safe e-waste management practices.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default { Features, HowItWorks, Impact };
