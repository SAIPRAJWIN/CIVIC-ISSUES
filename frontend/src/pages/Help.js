import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QuestionMarkCircleIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  DocumentTextIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: PlayIcon, color: 'from-green-500 to-teal-500' },
    { id: 'reporting', name: 'Reporting Issues', icon: DocumentTextIcon, color: 'from-blue-500 to-purple-500' },
    { id: 'ai-features', name: 'AI Features', icon: LightBulbIcon, color: 'from-yellow-500 to-orange-500' },
    { id: 'account', name: 'Account Management', icon: CheckCircleIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: ExclamationTriangleIcon, color: 'from-red-500 to-orange-500' }
  ];

  const helpContent = {
    'getting-started': [
      {
        question: 'How do I create an account?',
        answer: 'Click the "Get Started" button in the top navigation, fill out the registration form with your details, and verify your email address. You\'ll be ready to start reporting issues immediately!'
      },
      {
        question: 'What information do I need to provide?',
        answer: 'You only need a valid email address, your name, and to create a secure password. We may ask for your location to help route issues to the correct local authorities.'
      },
      {
        question: 'Is the platform free to use?',
        answer: 'Yes! Civic Issues is completely free for all citizens. We believe everyone should have access to tools that help improve their community.'
      },
      {
        question: 'How do I navigate the dashboard?',
        answer: 'Your dashboard shows all your reported issues, their current status, and quick actions. Use the sidebar to access different features like reporting new issues or viewing community statistics.'
      }
    ],
    'reporting': [
      {
        question: 'How do I report a new issue?',
        answer: 'Click "Report Issue" in your dashboard, take a photo of the problem, and our AI will automatically detect and categorize it. Add any additional details and submit!'
      },
      {
        question: 'What types of issues can I report?',
        answer: 'You can report potholes, broken streetlights, graffiti, damaged sidewalks, traffic signal problems, illegal dumping, and many other civic infrastructure issues.'
      },
      {
        question: 'Do I need to provide a location?',
        answer: 'Location is automatically captured when you take a photo. You can also manually adjust the location if needed for accuracy.'
      },
      {
        question: 'Can I report issues anonymously?',
        answer: 'While you need an account to submit reports, your personal information is kept private. Only authorized city officials can see reporter details when necessary for follow-up.'
      },
      {
        question: 'How do I track my reported issues?',
        answer: 'All your reports appear in your dashboard with real-time status updates. You\'ll receive notifications when there are updates or when issues are resolved.'
      }
    ],
    'ai-features': [
      {
        question: 'How accurate is the AI detection?',
        answer: 'Our AI has a 95% accuracy rate in identifying and categorizing civic issues. It continuously learns and improves with each report submitted to the platform.'
      },
      {
        question: 'What if the AI categorizes my issue incorrectly?',
        answer: 'You can easily edit the category and description before submitting. Your corrections help train the AI to be more accurate for future reports.'
      },
      {
        question: 'Can the AI detect multiple issues in one photo?',
        answer: 'Yes! Our advanced AI can identify multiple issues in a single image and will prompt you to create separate reports for each identified problem.'
      },
      {
        question: 'Does the AI work in low light conditions?',
        answer: 'The AI performs best in good lighting, but it can still detect many issues in low light. For best results, try to take photos during daylight hours when possible.'
      }
    ],
    'account': [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile to update your name, email, phone number, and notification preferences. Changes are saved automatically.'
      },
      {
        question: 'How do I change my password?',
        answer: 'In Settings > Security, you can change your password. You\'ll need to enter your current password and confirm the new one.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account in Settings > Account. Note that this will permanently remove all your data and cannot be undone.'
      },
      {
        question: 'How do I manage notification settings?',
        answer: 'In Settings > Notifications, you can choose which types of updates you want to receive via email, SMS, or push notifications.'
      }
    ],
    'troubleshooting': [
      {
        question: 'The app is running slowly. What should I do?',
        answer: 'Try refreshing the page or clearing your browser cache. If problems persist, check your internet connection or try using a different browser.'
      },
      {
        question: 'I can\'t upload photos. What\'s wrong?',
        answer: 'Ensure your browser has camera permissions enabled. Check that your image file is under 10MB and in a supported format (JPG, PNG, WebP).'
      },
      {
        question: 'My location isn\'t being detected correctly.',
        answer: 'Make sure location services are enabled in your browser. You can also manually set the location by clicking on the map when reporting an issue.'
      },
      {
        question: 'I\'m not receiving email notifications.',
        answer: 'Check your spam folder and ensure notifications are enabled in your settings. Add our email domain to your safe senders list.'
      }
    ]
  };

  const quickActions = [
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: VideoCameraIcon,
      color: 'from-red-500 to-pink-500',
      action: 'Watch Now'
    },
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our team',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-blue-500 to-purple-500',
      action: 'Start Chat'
    },
    {
      title: 'Phone Support',
      description: 'Speak with a support specialist',
      icon: PhoneIcon,
      color: 'from-green-500 to-teal-500',
      action: 'Call Now'
    },
    {
      title: 'Documentation',
      description: 'Browse detailed guides',
      icon: BookOpenIcon,
      color: 'from-orange-500 to-red-500',
      action: 'Read Docs'
    }
  ];

  const filteredContent = helpContent[activeCategory]?.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
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
            <QuestionMarkCircleIcon className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Find answers to your questions and learn how to make the most of Civic Issues
            </p>

            {/* Search Bar */}
            <motion.div
              className="max-w-2xl mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
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
              Need Immediate Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the best way to get support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {action.description}
                  </p>
                  <button className={`bg-gradient-to-r ${action.color} text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300`}>
                    {action.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Categories and Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg sticky top-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Help Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-300 ${
                          activeCategory === category.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  {(() => {
                    const activeIcon = categories.find(cat => cat.id === activeCategory)?.icon;
                    const Icon = activeIcon || InformationCircleIcon;
                    return <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
                  })()}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                </div>

                {searchTerm && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200">
                      {filteredContent.length} result(s) found for "{searchTerm}"
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredContent.map((item, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <button
                        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {filteredContent.length === 0 && searchTerm && (
                  <div className="text-center py-12">
                    <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Try searching with different keywords or browse our categories.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>Contact Support</span>
              </motion.a>
              <motion.a
                href="mailto:support@civicissues.com"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Email Us</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Help;