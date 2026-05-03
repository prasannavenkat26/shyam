import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Quote, Star, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Environmental Activist',
    text: 'ReLink has transformed how I manage e-waste. The rewards program motivates me to recycle more responsibly.',
    avatar: '👩‍💼',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Office Manager',
    text: 'Managing corporate e-waste is now seamless. ReLink handles everything with transparency and efficiency.',
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    name: 'Neha Patel',
    role: 'Sustainability Officer',
    text: 'The impact tracking dashboard gives us the metrics we need to meet our sustainability goals.',
    avatar: '👩‍🔬',
    rating: 5,
  },
  {
    name: 'Amit Singh',
    role: 'Tech Enthusiast',
    text: 'The QR verification system and real-time tracking make me confident my devices are recycled safely.',
    avatar: '👨‍💻',
    rating: 5,
  },
];

const faqs = [
  {
    question: 'How does ReLink ensure my devices are recycled safely?',
    answer:
      'All our recyclers are certified and follow international e-waste management standards. Each pickup is verified via QR code, and you can track the entire process in real-time through our dashboard.',
  },
  {
    question: 'What types of devices can I recycle through ReLink?',
    answer:
      'We accept laptops, desktops, phones, tablets, monitors, printers, TVs, keyboards, chargers, cables, and other electronic devices. Check our app for the complete list.',
  },
  {
    question: 'How do I earn and redeem reward points?',
    answer:
      'You earn points for every device recycled. The points vary based on the device type and condition. You can redeem them for discounts, gifts, or donate them to environmental initiatives.',
  },
  {
    question: 'Is the pickup service free?',
    answer:
      'Yes! Pickup is completely free for all users. We are committed to making responsible recycling accessible to everyone.',
  },
  {
    question: 'How is my personal data protected?',
    answer:
      'We use enterprise-grade encryption and follow strict data protection protocols. Your personal information is never shared with third parties without explicit consent.',
  },
  {
    question: 'Can businesses use ReLink for corporate e-waste?',
    answer:
      'Absolutely! We offer dedicated corporate packages with bulk pickup schedules, detailed reports, and CSR documentation. Contact our business team for more details.',
  },
];

export function Testimonials() {
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
      transition: { duration: 0.6 },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What Our Community Says
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join thousands of satisfied users making a difference through responsible e-waste recycling.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.2 }}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Quote className="w-5 h-5 text-emerald-400/50 mb-3" />
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{testimonial.text}</p>
              </motion.div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-slate-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-400">
            Find answers to common questions about ReLink and e-waste recycling.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div variants={containerVariants} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-slate-700 rounded-lg overflow-hidden hover:border-emerald-500/50 transition-all"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 transition-all"
              >
                <span className="text-left font-semibold text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-emerald-400" />
                </motion.div>
              </motion.button>

              {/* Answer */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-slate-900 text-slate-300 border-t border-slate-700">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default { Testimonials, FAQ };
