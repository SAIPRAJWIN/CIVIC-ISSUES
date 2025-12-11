import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  CameraIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon,
  EyeIcon,
  ChartBarIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  StarIcon,
  TrophyIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import civicLogo from '../assets/civic-logo.png';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const heroSlides = [
    {
      title: "AI-Powered Civic Reporting",
      subtitle: "Transform your community with intelligent issue detection",
      gradient: "from-blue-600 via-purple-600 to-indigo-600",
      icon: SparklesIcon
    },
    {
      title: "Real-Time Issue Tracking", 
      subtitle: "Monitor progress from report to resolution",
      gradient: "from-green-600 via-teal-600 to-cyan-600",
      icon: EyeIcon
    },
    {
      title: "Community-Driven Change",
      subtitle: "Join thousands making their cities better",
      gradient: "from-orange-600 via-red-600 to-pink-600", 
      icon: HeartIcon
    }
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Detection',
      description: 'Advanced computer vision automatically identifies and categorizes civic issues with 95% accuracy.',
      color: 'from-purple-500 to-pink-500',
      stats: '95% Accuracy'
    },
    {
      icon: MapPinIcon,
      title: 'Smart Geolocation',  
      description: 'Precise GPS tracking with automatic address detection and interactive mapping capabilities.',
      color: 'from-blue-500 to-cyan-500',
      stats: '±3m Precision'
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast',
      description: 'Real-time processing with instant notifications and live status updates for all stakeholders.',
      color: 'from-yellow-500 to-orange-500',
      stats: '<2s Response'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption with GDPR compliance and role-based access control systems.',
      color: 'from-green-500 to-teal-500',
      stats: '256-bit SSL'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights with trend analysis, performance metrics, and predictive modeling.',
      color: 'from-indigo-500 to-purple-500',
      stats: '50+ Metrics'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Scale',
      description: 'Multi-language support with cloud infrastructure serving cities worldwide.',
      color: 'from-red-500 to-pink-500',
      stats: '100+ Cities'
    }
  ];

  const stats = [
    { number: '25,847', label: 'Issues Resolved', icon: CheckCircleIcon, color: 'text-green-500' },
    { number: '94.2%', label: 'Success Rate', icon: TrophyIcon, color: 'text-blue-500' },
    { number: '18min', label: 'Avg Response', icon: ClockIcon, color: 'text-purple-500' },
    { number: '127', label: 'Active Cities', icon: GlobeAltIcon, color: 'text-orange-500' }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "City Manager, San Francisco",
      content: "This platform revolutionized how we handle civic issues. Response times improved by 300%.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Marcus Johnson", 
      role: "Community Leader, Detroit",
      content: "Finally, a system that actually works! Our neighborhood has never looked better.",
      rating: 5,
      avatar: "👨‍🏫"
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Urban Planning Director",
      content: "The AI detection is incredibly accurate. It's like having 1000 inspectors working 24/7.",
      rating: 5,
      avatar: "👩‍🔬"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Enhanced Hero Section with Animated Slides */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].gradient}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                className="mb-8"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {React.createElement(heroSlides[currentSlide].icon, {
                  className: "w-20 h-20 mx-auto mb-6 text-white/90"
                })}
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/90">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/signup-user"
              className="group relative bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span className="flex items-center space-x-2">
                <span>Start Reporting Issues</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/ai-demo"
              className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5" />
                <span>🎯 Try AI Detection</span>
              </span>
            </Link>
            
            <Link
              to="/login-admin"
              className="group border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>Admin Dashboard</span>
                <EyeIcon className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Communities Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real impact, measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="relative group"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <motion.div
                        className="mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Icon className={`w-12 h-12 mx-auto ${stat.color}`} />
                      </motion.div>
                      
                      <motion.div
                        className="text-4xl md:text-5xl font-bold mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        <span className={`bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-purple-600 bg-clip-text text-transparent`}>
                          {stat.number}
                        </span>
                      </motion.div>
                      
                      <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                        {stat.label}
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <LightBulbIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200 font-semibold">Next-Generation Technology</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Cities</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Built with cutting-edge AI and cloud technology to make civic reporting seamless, efficient, and impactful for communities worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Icon with Animation */}
                    <motion.div
                      className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Stats Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.color} text-white`}>
                        {feature.stats}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <motion.div
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn more</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Communities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what city officials and citizens are saying
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
                scale: [1, 1.2, 1],
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HeartIcon className="w-16 h-16 text-white/90 mx-auto" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Make a 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Difference?</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join thousands of citizens who are actively improving their communities. 
              Your reports lead to real change, and every issue matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/signup-user"
                className="group bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="flex items-center space-x-2">
                  <span>Report Your First Issue</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                to="/ai-demo"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="flex items-center space-x-2">
                  <PlayIcon className="w-5 h-5" />
                  <span>Try Demo</span>
                </span>
              </Link>
              
              <Link
                to="/login-user"
                className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <EyeIcon className="w-5 h-5" />
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Secure</div>
                <div className="text-sm">& Private</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">AI</div>
                <div className="text-sm">Powered</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <img 
                    src={civicLogo} 
                    alt="Civic Issues Logo" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CIVIC ISSUES
                </span>
              </motion.div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Empowering communities worldwide through AI-powered civic engagement. 
                Making cities smarter, safer, and more responsive to citizen needs.
              </p>
              
              <div className="flex space-x-4">
                <motion.div
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-bold">f</span>
                </motion.div>
                <motion.div
                  className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "#60A5FA" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-bold">t</span>
                </motion.div>
                <motion.div
                  className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "#9333EA" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-bold">in</span>
                </motion.div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Report Issue', to: '/report-issue' },
                  { name: 'AI Demo', to: '/ai-demo' },
                  { name: 'Dashboard', to: '/dashboard' },
                  { name: 'My Issues', to: '/my-issues' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  <span>support@civicissues.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Civic Issues. All rights reserved. Built with ❤️ for communities.
              </div>
              
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;