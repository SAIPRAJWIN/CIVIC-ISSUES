/**
 * Debug utility to test red outline drawing directly
 */

export const createTestImageWithRedOutlines = () => {
  return new Promise((resolve) => {
    // Create a test canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple test background
    ctx.fillStyle = '#E5E7EB'; // Light gray
    ctx.fillRect(0, 0, 400, 300);
    
    // Add some test content
    ctx.fillStyle = '#374151'; // Dark gray
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TEST IMAGE', 200, 50);
    ctx.fillText('FOR RED OUTLINES', 200, 80);
    
    // Draw some mock "issues" as colored rectangles
    ctx.fillStyle = '#6B7280'; // Gray rectangle (pothole)
    ctx.fillRect(50, 120, 80, 40);
    
    ctx.fillStyle = '#9CA3AF'; // Light gray rectangle (garbage)
    ctx.fillRect(270, 150, 60, 60);
    
    ctx.fillStyle = '#D1D5DB'; // Very light gray (infrastructure)
    ctx.fillRect(150, 200, 100, 30);
    
    // Now draw VERY PROMINENT red outlines
    
    // Outline 1 - Pothole
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 8;
    ctx.strokeRect(45, 115, 90, 50);
    
    // Add corner emphasis
    ctx.lineWidth = 12;
    const cornerSize = 15;
    
    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(45, 115 + cornerSize);
    ctx.lineTo(45, 115);
    ctx.lineTo(45 + cornerSize, 115);
    ctx.stroke();
    
    // Top-right corner
    ctx.beginPath();
    ctx.moveTo(135 - cornerSize, 115);
    ctx.lineTo(135, 115);
    ctx.lineTo(135, 115 + cornerSize);
    ctx.stroke();
    
    // Bottom-left corner
    ctx.beginPath();
    ctx.moveTo(45, 165 - cornerSize);
    ctx.lineTo(45, 165);
    ctx.lineTo(45 + cornerSize, 165);
    ctx.stroke();
    
    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(135 - cornerSize, 165);
    ctx.lineTo(135, 165);
    ctx.lineTo(135, 165 - cornerSize);
    ctx.stroke();
    
    // Outline 2 - Garbage
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 8;
    ctx.strokeRect(265, 145, 70, 70);
    
    // Outline 3 - Infrastructure
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 8;
    ctx.strokeRect(145, 195, 110, 40);
    
    // Add labels
    ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    ctx.fillRect(45, 90, 120, 25);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('🎯 Pothole (85%)', 50, 108);
    
    ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    ctx.fillRect(265, 120, 110, 25);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('🎯 Garbage (78%)', 270, 138);
    
    ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    ctx.fillRect(145, 170, 140, 25);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('🎯 Infrastructure (80%)', 150, 188);
    
    // Convert to blob
    canvas.toBlob((blob) => {
      resolve({
        success: true,
        annotatedImage: blob,
        detectedIssues: [
          { label: 'Pothole', confidence: 0.85, bbox: { x: 45, y: 115, width: 90, height: 50 } },
          { label: 'Garbage', confidence: 0.78, bbox: { x: 265, y: 145, width: 70, height: 70 } },
          { label: 'Infrastructure', confidence: 0.80, bbox: { x: 145, y: 195, width: 110, height: 40 } }
        ],
        confidence: 0.81,
        analysisData: {
          imageSize: { width: 400, height: 300 },
          detectionCount: 3,
          processingTime: 100
        }
      });
    }, 'image/jpeg', 0.9);
  });
};

export const testRedOutlineDrawing = async () => {
  console.log('🧪 Testing red outline drawing...');
  
  try {
    const result = await createTestImageWithRedOutlines();
    console.log('✅ Test image with red outlines created successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to create test image:', error);
    return { success: false, error: error.message };
  }
};