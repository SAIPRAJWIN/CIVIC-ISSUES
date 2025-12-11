import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Camera,
  FileImage,
  AlertCircle,
  Check,
  Brain,
  Eye,
  Target,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import aiService from '../../services/aiService';
import imageAnalysisService from '../../services/imageAnalysisService';

const EnhancedImageUpload = ({
  onImagesChange = () => {},
  onAiDescription = () => {},
  maxImages = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className = ''
}) => {
  const [images, setImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not supported. Please use JPG, PNG, or WebP.`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return false;
    }

    return true;
  };

  const processFiles = async (files) => {
    const fileArray = Array.from(files);
    
    if (images.length + fileArray.length > maxImages) {
      toast.error(`You can upload a maximum of ${maxImages} images`);
      return;
    }

    setUploading(true);

    const newImages = [];
    
    for (const file of fileArray) {
      if (!validateFile(file)) continue;

      try {
        const imageData = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: file.size,
          preview: URL.createObjectURL(file),
          uploaded: false,
          analyzing: true,
          aiDescription: null,
          issueDetection: null,
          annotatedImage: null
        };

        newImages.push(imageData);
        
        // Start dual AI analysis: description + issue detection
        Promise.all([
          aiService.analyzeImage(file),
          imageAnalysisService.analyzeImage(file, '')
        ]).then(([descriptionAnalysis, issueAnalysis]) => {
          setImages(prevImages => 
            prevImages.map(img => 
              img.id === imageData.id 
                ? { 
                    ...img, 
                    analyzing: false, 
                    aiDescription: descriptionAnalysis.description,
                    aiAnalysis: descriptionAnalysis,
                    issueDetection: issueAnalysis,
                    annotatedImage: issueAnalysis.success ? issueAnalysis.annotatedImage : null
                  }
                : img
            )
          );
          
          // Pass AI description up to parent
          if (descriptionAnalysis && descriptionAnalysis.description) {
            try { onAiDescription(descriptionAnalysis.description); } catch (e) {}
          }
          
          // Show success messages
          if (issueAnalysis.success && issueAnalysis.detectedIssues.length > 0) {
            toast.success(`🎯 Detected ${issueAnalysis.detectedIssues.length} civic issue(s) in ${file.name}`);
          } else {
            toast.success(`🤖 AI analysis completed for ${file.name}`);
          }
        }).catch(error => {
          console.error('AI analysis failed:', error);
          setImages(prevImages => 
            prevImages.map(img => 
              img.id === imageData.id 
                ? { ...img, analyzing: false }
                : img
            )
          );
          toast.error(`Analysis failed for ${file.name}`);
        });

      } catch (error) {
        console.error('Error processing file:', error);
        toast.error(`Error processing ${file.name}`);
      }
    }

    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);
      toast.success(`${newImages.length} image${newImages.length !== 1 ? 's' : ''} added - analyzing with AI...`);
    }

    setUploading(false);
  };

  const removeImage = (imageId) => {
    setImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === imageId);
      if (imageToRemove) {
        if (imageToRemove.preview) {
          URL.revokeObjectURL(imageToRemove.preview);
        }
        if (imageToRemove.annotatedImageUrl) {
          URL.revokeObjectURL(imageToRemove.annotatedImageUrl);
        }
      }
      
      const updatedImages = prevImages.filter(img => img.id !== imageId);
      onImagesChange(updatedImages);
      return updatedImages;
    });
    
    toast.success('Image removed');
  };

  const toggleImageView = (imageId) => {
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === imageId 
          ? { ...img, showAnnotated: !img.showAnnotated }
          : img
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFiles(files);
    }
    e.target.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getImageSrc = (image) => {
    if (image.showAnnotated && image.annotatedImage) {
      // Create a stable URL for the annotated image
      if (!image.annotatedImageUrl) {
        image.annotatedImageUrl = URL.createObjectURL(image.annotatedImage);
      }
      return image.annotatedImageUrl;
    }
    return image.preview;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-4">
          {uploading ? (
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          ) : (
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              {isDragOver ? (
                <Upload className="w-6 h-6 text-blue-600" />
              ) : (
                <Camera className="w-6 h-6 text-gray-400" />
              )}
            </div>
          )}

          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {uploading ? 'Processing images...' : 'Upload Images'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Drag and drop images here, or click to select files
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Supports JPG, PNG, WebP up to {Math.round(maxSize / (1024 * 1024))}MB each
            </p>
          </div>

          {images.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {images.length} of {maxImages} images selected
            </div>
          )}
        </div>
      </div>

      {/* Image Previews */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Image Preview */}
                <div className="aspect-video relative">
                  <img
                    src={getImageSrc(image)}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                  
                  {/* Control Buttons */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {/* Toggle View Button */}
                    {image.annotatedImage && !image.analyzing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImageView(image.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          image.showAnnotated 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } opacity-0 group-hover:opacity-100`}
                        title={image.showAnnotated ? 'Show Original' : 'Show Issue Detection'}
                      >
                        {image.showAnnotated ? <Eye className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                      </button>
                    )}
                    
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status Indicators */}
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    {/* AI Analysis Status */}
                    {image.analyzing && (
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                    
                    {/* Issue Detection Status */}
                    {image.issueDetection && !image.analyzing && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                        image.issueDetection.detectedIssues.length > 0 ? 'bg-red-500' : 'bg-green-500'
                      }`}>
                        <Target className="w-4 h-4" />
                      </div>
                    )}
                    
                    {/* AI Description Status */}
                    {image.aiDescription && !image.analyzing && (
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* View Mode Indicator */}
                  {image.showAnnotated && image.annotatedImage && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Issues Detected
                    </div>
                  )}
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileImage className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {image.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {formatFileSize(image.size)}
                  </p>
                  
                  {/* Analysis Status */}
                  {image.analyzing && (
                    <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 mb-3">
                      <Brain className="w-3 h-3 animate-pulse" />
                      <span>Analyzing with AI...</span>
                    </div>
                  )}
                  
                  {/* Issue Detection Results */}
                  {image.issueDetection && !image.analyzing && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-medium text-red-900 dark:text-red-200">
                          Issue Detection
                        </span>
                      </div>
                      {image.issueDetection.detectedIssues.length > 0 ? (
                        <div className="space-y-1">
                          {image.issueDetection.detectedIssues.map((issue, index) => (
                            <div key={index} className="text-xs text-red-800 dark:text-red-300">
                              • {issue.label} ({Math.round(issue.confidence * 100)}%)
                            </div>
                          ))}
                          <div className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                            🎯 {image.issueDetection.detectedIssues.length} issue(s) outlined in red
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-green-800 dark:text-green-300">
                          ✅ No specific issues detected
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* AI Description */}
                  {image.aiDescription && !image.analyzing && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-purple-900 dark:text-purple-200">
                          AI Description
                        </span>
                      </div>
                      <p className="text-xs text-purple-800 dark:text-purple-300">
                        {image.aiDescription}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Guidelines */}
      {images.length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-1">
                Enhanced AI Photo Analysis
              </h4>
              <ul className="text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Take clear, well-lit photos of civic issues</li>
                <li>• 🎯 AI will automatically detect and outline issues in red</li>
                <li>• 🤖 Smart descriptions generated using Gemini AI</li>
                <li>• Toggle between original and annotated views</li>
                <li>• Multiple angles help improve detection accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Notice */}
      {images.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-red-50 dark:from-purple-900/20 dark:to-red-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <h4 className="font-medium text-gray-900 dark:text-white">
                🚀 Advanced AI Analysis Active
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                🎯 <strong>Issue Detection:</strong> Red outlines around detected problems • 
                🤖 <strong>Smart Descriptions:</strong> AI-generated content analysis
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedImageUpload;