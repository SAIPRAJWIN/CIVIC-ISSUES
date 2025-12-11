import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Upload, Eye, TestTube } from 'lucide-react';
import imageAnalysisService from '../../services/imageAnalysisService';
import { testRedOutlineDrawing } from '../../utils/debugRedOutlines';
import toast from 'react-hot-toast';

const RedOutlineTest = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setOriginalImage(URL.createObjectURL(file));
    setAnnotatedImage(null);
    setDetectionResults(null);

    try {
      console.log('🔍 Starting red outline test...');
      
      // Run the AI analysis with guaranteed detection
      const results = await imageAnalysisService.analyzeImage(file, 'test pothole garbage broken');
      
      console.log('✅ Analysis results:', results);
      
      if (results.success && results.annotatedImage) {
        const annotatedUrl = URL.createObjectURL(results.annotatedImage);
        setAnnotatedImage(annotatedUrl);
        setDetectionResults(results);
        toast.success(`🎯 Red outlines drawn! Detected ${results.detectedIssues.length} issues`);
      } else {
        toast.error('❌ Failed to generate red outlines');
        console.error('Analysis failed:', results);
      }
    } catch (error) {
      console.error('❌ Error in red outline test:', error);
      toast.error('Error processing image');
    } finally {
      setIsProcessing(false);
    }
  };

  const runDebugTest = async () => {
    setIsProcessing(true);
    setOriginalImage(null);
    setAnnotatedImage(null);
    setDetectionResults(null);

    try {
      console.log('🧪 Running debug test for red outlines...');
      const results = await testRedOutlineDrawing();
      
      if (results.success) {
        const annotatedUrl = URL.createObjectURL(results.annotatedImage);
        setAnnotatedImage(annotatedUrl);
        setDetectionResults(results);
        toast.success('🎯 Debug test complete! Red outlines should be visible');
      } else {
        toast.error('❌ Debug test failed');
      }
    } catch (error) {
      console.error('❌ Debug test error:', error);
      toast.error('Debug test error');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTest = () => {
    if (originalImage) URL.revokeObjectURL(originalImage);
    if (annotatedImage) URL.revokeObjectURL(annotatedImage);
    setOriginalImage(null);
    setAnnotatedImage(null);
    setDetectionResults(null);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Red Outline Detection Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload any image to test the red outline detection system
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>{isProcessing ? 'Processing...' : 'Upload Test Image'}</span>
          </button>
          
          <button
            onClick={runDebugTest}
            disabled={isProcessing}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <TestTube className="w-5 h-5" />
            <span>🎯 Test Red Outlines</span>
          </button>
          
          {(originalImage || annotatedImage) && (
            <button
              onClick={resetTest}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Reset Test
            </button>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-lg">
            <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              🎯 Drawing red outlines around detected issues...
            </span>
          </div>
        </motion.div>
      )}

      {/* Results Section */}
      {(originalImage || annotatedImage) && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Original Image */}
          {originalImage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Original Image</span>
                </h3>
              </div>
              <div className="p-4">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto rounded border"
                />
              </div>
            </motion.div>
          )}

          {/* Annotated Image */}
          {annotatedImage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-red-100 dark:bg-red-900/20 px-4 py-3 border-b border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-900 dark:text-red-200 flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>With Red Outlines</span>
                </h3>
              </div>
              <div className="p-4">
                <img
                  src={annotatedImage}
                  alt="With Red Outlines"
                  className="w-full h-auto rounded border border-red-300"
                />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Detection Results */}
      {detectionResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-4">
            ✅ Detection Results
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Detected Issues:</h4>
              <ul className="space-y-2">
                {detectionResults.detectedIssues.map((issue, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Target className="w-4 h-4 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {issue.label} ({Math.round(issue.confidence * 100)}% confidence)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Analysis Data:</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Issues Found: {detectionResults.detectedIssues.length}</li>
                <li>• Average Confidence: {Math.round(detectionResults.confidence * 100)}%</li>
                <li>• Image Size: {detectionResults.analysisData?.imageSize?.width} × {detectionResults.analysisData?.imageSize?.height}</li>
                <li>• Processing Time: {detectionResults.analysisData?.processingTime}ms</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!originalImage && !isProcessing && (
        <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ready to Test Red Outlines
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Upload any image to see the AI detection system draw red outlines around civic issues
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <li>• System will automatically detect issues</li>
            <li>• Red outlines will be drawn around problems</li>
            <li>• Compare original vs annotated images</li>
            <li>• View detection confidence scores</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RedOutlineTest;