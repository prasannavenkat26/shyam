import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, TrendingUp, Users, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Hero() {
  const { state } = useAuth();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-20 px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={containerVariants} className="space-y-6">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                <Leaf className="w-4 h-4" />
                AI-Powered E-Waste Management
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Recycle Smart,
                </span>
                <br />
                <span className="text-white">Live Greener</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-300 max-w-md leading-relaxed"
            >
              ReLink connects households, offices, and certified recyclers through an intelligent
              digital ecosystem. Safely dispose of e-waste, earn rewards, and make a real
              environmental impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              {state.isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0">
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0">
                      Get Started Free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-slate-700 hover:bg-slate-800"
                    >
                      Learn More
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700"
            >
              {[
                { label: 'E-Waste Recycled', value: '50K+', icon: TrendingUp },
                { label: 'Active Users', value: '10K+', icon: Users },
                { label: 'Certified Partners', value: '500+', icon: ShieldCheck },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex justify-center mb-2"
                  >
                    <stat.icon className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                  <div className="font-bold text-lg text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={itemVariants}
            className="relative h-[500px] hidden md:flex items-center justify-center"
          >
            {/* Animated Card Stack */}
            {[
              {
                icon: Leaf,
                title: 'Eco-Friendly',
                color: 'from-emerald-400 to-green-500',
              },
              {
                icon: Zap,
                title: 'Fast & Easy',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: TrendingUp,
                title: 'Earn Rewards',
                color: 'from-blue-400 to-cyan-500',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [-5 + i * 5, -5 + i * 5, -5 + i * 5],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-48 h-48 bg-gradient-to-br p-6 rounded-2xl border border-white/10 shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  '--tw-gradient-from': `rgb(${
                    card.color === 'from-emerald-400 to-green-500'
                      ? '52 211 153'
                      : card.color === 'from-yellow-400 to-orange-500'
                        ? '250 204 21'
                        : '96 165 250'
                  })`,
                  '--tw-gradient-to': `rgba(0, 0, 0, 0.1)`,
                } as React.CSSProperties}
              >
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <motion.div whileHover={{ scale: 1.2 }} className="p-3 bg-white/10 rounded-lg">
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <span className="text-lg font-semibold text-white text-center">{card.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
