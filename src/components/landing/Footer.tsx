import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Team'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API Reference', 'Community', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-slate-950 to-black px-4 py-16 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">RL</span>
              </div>
              <span className="font-bold text-white text-lg">ReLink</span>
            </div>
            <p className="text-slate-400 text-sm">
              Transforming e-waste management through AI and community action.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map((section, i) => (
            <motion.div
              key={section[0]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <h4 className="font-semibold text-white mb-4">{section[0]}</h4>
              <ul className="space-y-2">
                {section[1].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-slate-800 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
              <div className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>hello@relink.eco</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>+91 9876 543 210</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col justify-between">
              <p className="text-slate-400 text-sm">
                © 2024 ReLink. All rights reserved. Made with ❤️ for a sustainable future.
              </p>
              <p className="text-slate-500 text-xs">
                Committed to UN Sustainable Development Goals 11 & 12
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
