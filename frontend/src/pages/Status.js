import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  ClockIcon,
  SignalIcon,
  ServerIcon,
  GlobeAltIcon,
  CpuChipIcon,
  CloudIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Status = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const systemStatus = {
    overall: 'operational', // operational, degraded, outage
    lastUpdated: new Date(),
    uptime: '99.98%'
  };

  const services = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '145ms',
      icon: GlobeAltIcon,
      description: 'Main web platform and user interface'
    },
    {
      name: 'AI Detection Service',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '2.1s',
      icon: CpuChipIcon,
      description: 'Image analysis and issue categorization'
    },
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '89ms',
      icon: ServerIcon,
      description: 'Backend API and data processing'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '12ms',
      icon: CloudIcon,
      description: 'Data storage and retrieval systems'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '67ms',
      icon: ShieldCheckIcon,
      description: 'User login and security services'
    },
    {
      name: 'Notifications',
      status: 'degraded',
      uptime: '98.45%',
      responseTime: '3.2s',
      icon: BoltIcon,
      description: 'Email and push notification delivery'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Notification Delivery Delays',
      status: 'investigating',
      severity: 'minor',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      description: 'Some users may experience delays in receiving email notifications. We are investigating the issue.',
      updates: [
        {
          time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          message: 'We have identified the root cause and are implementing a fix.'
        },
        {
          time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          message: 'We are investigating reports of delayed email notifications.'
        }
      ]
    }
  ];

  const metrics = [
    {
      name: 'Response Time',
      value: '145ms',
      change: '-12ms',
      trend: 'down',
      icon: ClockIcon,
      color: 'text-green-600'
    },
    {
      name: 'Uptime',
      value: '99.98%',
      change: '+0.02%',
      trend: 'up',
      icon: SignalIcon,
      color: 'text-green-600'
    },
    {
      name: 'Active Users',
      value: '12,847',
      change: '+1,234',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'text-blue-600'
    },
    {
      name: 'Issues Processed',
      value: '2,456',
      change: '+89',
      trend: 'up',
      icon: CpuChipIcon,
      color: 'text-purple-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'outage':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return CheckCircleIcon;
      case 'degraded':
        return ExclamationTriangleIcon;
      case 'outage':
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'major':
        return 'bg-orange-500';
      case 'minor':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SignalIcon className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              System Status
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Real-time status and performance metrics for all Civic Issues services
            </p>

            {/* Overall Status */}
            <motion.div
              className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
              <span className="text-white font-semibold">All Systems Operational</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Current Metrics */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Current Performance
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Live metrics updated every minute
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {currentTime.toLocaleTimeString()}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.name}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {metric.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Status */}
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
              Service Status
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Individual component health and performance
            </p>
          </motion.div>

          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const StatusIcon = getStatusIcon(service.status);
              return (
                <motion.div
                  key={service.name}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {service.uptime}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Response</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {service.responseTime}
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(service.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Incidents */}
      {incidents.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Active Incidents
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Current issues and their resolution progress
              </p>
            </motion.div>

            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident.severity)}`}></div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {incident.title}
                      </h3>
                      <span className="px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full">
                        {incident.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Started {incident.startTime.toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {incident.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Updates:</h4>
                    {incident.updates.map((update, updateIndex) => (
                      <div key={updateIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {update.time.toLocaleString()}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300">
                            {update.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Historical Uptime */}
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
              Historical Uptime
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              90-day uptime history for all services
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-90 gap-1 mb-6">
              {Array.from({ length: 90 }, (_, i) => (
                <motion.div
                  key={i}
                  className={`h-8 rounded ${
                    Math.random() > 0.05 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1, delay: i * 0.01 }}
                  viewport={{ once: true }}
                  title={`Day ${90 - i}: ${Math.random() > 0.05 ? 'Operational' : 'Incident'}`}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>90 days ago</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Operational</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Incident</span>
                </div>
              </div>
              <span>Today</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to status updates and incident notifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Status;