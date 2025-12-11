import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Brain, 
  Camera, 
  Eye, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import EnhancedImageUpload from '../components/UI/EnhancedImageUpload';
import RedOutlineTest from '../components/Test/RedOutlineTest';

const AIDetectionDemo = () => {
  const [demoImages, setDemoImages] = useState([]);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const demoScenarios = [
    {
      id: 'pothole',
      title: 'Pothole Detection',
      description: 'AI detects road damage and potholes with precise red outlines',
      icon: Target,
      color: 'bg-red-500',
      features: ['Precise boundary detection', 'Confidence scoring', 'Size estimation']
    },
    {
      id: 'garbage',
      title: 'Garbage & Litter Detection',
      description: 'Identifies waste accumulation and litter in public spaces',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      features: ['Multiple object detection', 'Waste type classification', 'Area coverage']
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Damage',
      description: 'Detects broken streetlights, damaged signs, and infrastructure issues',
      icon: Zap,
      color: 'bg-blue-500',
      features: ['Structural analysis', 'Damage severity', 'Safety assessment']
    },
    {
      id: 'waterlogging',
      title: 'Water Accumulation',
      description: 'Identifies flooding, waterlogging, and drainage problems',
      icon: CheckCircle,
      color: 'bg-cyan-500',
      features: ['Water level detection', 'Area mapping', 'Drainage assessment']
    }
  ];

  const handleDemoImageChange = (images) => {
    setDemoImages(images);
  };

  const handleAiDescription = (description) => {
    console.log('AI Description received:', description);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Issue Detection Demo
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience our advanced AI system that automatically detects civic issues and draws precise red outlines around problems in uploaded images.
          </p>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {demoScenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <Card key={scenario.id} className="text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${scenario.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {scenario.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {scenario.description}
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  {scenario.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How AI Detection Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced computer vision system processes your images in real-time
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Upload Image</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Upload photos of civic issues from your device
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. AI Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Computer vision algorithms analyze the image content
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Issue Detection</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Problems are identified and outlined with red borders
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Review Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Toggle between original and annotated views
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Red Outline Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card>
            <RedOutlineTest />
          </Card>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🚀 Full Integration Demo
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Experience the complete AI detection system as used in issue reporting
              </p>
            </div>

            <EnhancedImageUpload
              onImagesChange={handleDemoImageChange}
              onAiDescription={handleAiDescription}
              maxImages={3}
              className="max-w-4xl mx-auto"
            />

            {demoImages.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Analysis Complete!
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">✅ What's Working:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Automatic issue detection</li>
                      <li>• Red outline generation</li>
                      <li>• Confidence scoring</li>
                      <li>• Toggle view functionality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">🎯 Detection Features:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Potholes and road damage</li>
                      <li>• Garbage and litter</li>
                      <li>• Infrastructure damage</li>
                      <li>• Water accumulation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Detection Capabilities
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-red-500 mt-1" />
                <span><strong>Potholes:</strong> Road surface damage, cracks, and holes</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-red-500 mt-1" />
                <span><strong>Garbage:</strong> Litter, waste piles, and debris</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-red-500 mt-1" />
                <span><strong>Infrastructure:</strong> Broken lights, damaged signs</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-red-500 mt-1" />
                <span><strong>Water Issues:</strong> Flooding, drainage problems</span>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Features
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span><strong>Real-time Processing:</strong> Instant analysis results</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span><strong>Precise Outlines:</strong> Sharp red borders around issues</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span><strong>Confidence Scores:</strong> Accuracy percentage for each detection</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span><strong>Multiple Issues:</strong> Detects several problems per image</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Report Issues with AI?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Use this powerful AI detection system in your civic issue reports
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/report-issue'}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Reporting Issues
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Learn More
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AIDetectionDemo;