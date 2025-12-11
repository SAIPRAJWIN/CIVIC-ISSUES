import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  SparklesIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  CpuChipIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  TagIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Updates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Updates', icon: BellIcon },
    { id: 'features', name: 'New Features', icon: SparklesIcon },
    { id: 'improvements', name: 'Improvements', icon: BoltIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'ai', name: 'AI Updates', icon: CpuChipIcon }
  ];

  const updates = [
    {
      id: 1,
      title: 'Enhanced AI Detection Accuracy',
      category: 'ai',
      type: 'feature',
      date: new Date('2024-01-15'),
      version: 'v2.4.0',
      description: 'Our AI model now achieves 97% accuracy in detecting and categorizing civic issues, up from 95%. New training data includes 50,000+ additional images.',
      highlights: [
        'Improved pothole detection in various lighting conditions',
        'Better recognition of graffiti and vandalism',
        'Enhanced traffic signal malfunction identification',
        'New support for detecting damaged street signs'
      ],
      impact: 'high',
      image: '🤖'
    },
    {
      id: 2,
      title: 'Real-time Notification System',
      category: 'features',
      type: 'feature',
      date: new Date('2024-01-10'),
      version: 'v2.3.5',
      description: 'Introducing instant push notifications for issue status updates, ensuring you never miss important developments on your reported issues.',
      highlights: [
        'Instant push notifications for mobile and desktop',
        'Customizable notification preferences',
        'Email digest options (daily, weekly)',
        'SMS notifications for critical updates'
      ],
      impact: 'medium',
      image: '🔔'
    },
    {
      id: 3,
      title: 'Advanced Security Enhancements',
      category: 'security',
      type: 'security',
      date: new Date('2024-01-05'),
      version: 'v2.3.4',
      description: 'Implemented additional security measures including two-factor authentication and enhanced data encryption protocols.',
      highlights: [
        'Two-factor authentication (2FA) support',
        'End-to-end encryption for sensitive data',
        'Enhanced session management',
        'Regular security audits and penetration testing'
      ],
      impact: 'high',
      image: '🔒'
    },
    {
      id: 4,
      title: 'Mobile App Performance Boost',
      category: 'improvements',
      type: 'improvement',
      date: new Date('2024-01-01'),
      version: 'v2.3.3',
      description: 'Significant performance improvements for mobile users, including faster image uploads and reduced battery consumption.',
      highlights: [
        '40% faster image upload speeds',
        '25% reduction in battery usage',
        'Improved offline functionality',
        'Enhanced camera integration'
      ],
      impact: 'medium',
      image: '📱'
    },
    {
      id: 5,
      title: 'Community Dashboard Launch',
      category: 'features',
      type: 'feature',
      date: new Date('2023-12-20'),
      version: 'v2.3.0',
      description: 'New community dashboard provides insights into local civic issues, trends, and resolution statistics for your area.',
      highlights: [
        'Interactive maps showing local issues',
        'Community statistics and trends',
        'Leaderboards for active reporters',
        'Neighborhood-specific insights'
      ],
      impact: 'high',
      image: '📊'
    },
    {
      id: 6,
      title: 'Multi-language Support',
      category: 'features',
      type: 'feature',
      date: new Date('2023-12-15'),
      version: 'v2.2.8',
      description: 'Platform now supports 12 languages, making civic engagement accessible to more diverse communities worldwide.',
      highlights: [
        'Support for 12 major languages',
        'Automatic language detection',
        'Localized content and help resources',
        'Cultural adaptation for different regions'
      ],
      impact: 'high',
      image: '🌍'
    }
  ];

  const filteredUpdates = selectedCategory === 'all' 
    ? updates 
    : updates.filter(update => update.category === selectedCategory);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'feature':
        return SparklesIcon;
      case 'improvement':
        return BoltIcon;
      case 'security':
        return ShieldCheckIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const stats = [
    { label: 'Total Updates', value: '47', icon: BellIcon, color: 'from-blue-500 to-purple-500' },
    { label: 'This Month', value: '8', icon: CalendarIcon, color: 'from-green-500 to-teal-500' },
    { label: 'New Features', value: '23', icon: SparklesIcon, color: 'from-orange-500 to-red-500' },
    { label: 'Security Updates', value: '12', icon: ShieldCheckIcon, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BellIcon className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Platform Updates
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Stay up-to-date with the latest features, improvements, and enhancements 
              to the Civic Issues platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories and Updates */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Updates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover what's new and improved in our platform
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Updates List */}
          <div className="space-y-8">
            {filteredUpdates.map((update, index) => {
              const TypeIcon = getTypeIcon(update.type);
              return (
                <motion.div
                  key={update.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{update.image}</div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {update.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(update.impact)}`}>
                            {update.impact} impact
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{update.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TagIcon className="w-4 h-4" />
                            <span>{update.version}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TypeIcon className="w-4 h-4" />
                            <span className="capitalize">{update.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {update.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-2">
                      {update.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                          key={highlightIndex}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: highlightIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn more about this update</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BellIcon className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter and never miss important platform updates, 
              new features, and improvements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span>Weekly updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span>No spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Teaser */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              What's Coming Next?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're constantly working on new features and improvements. 
              Here's a sneak peek at what's coming in the next few months.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Voice Reporting', desc: 'Report issues using voice commands', icon: '🎤' },
                { title: 'AR Integration', desc: 'Augmented reality for better issue visualization', icon: '🥽' },
                { title: 'Smart Analytics', desc: 'Predictive insights for city planning', icon: '📈' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Share Your Ideas</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Updates;