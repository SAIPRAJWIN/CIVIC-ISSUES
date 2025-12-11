const mongoose = require('mongoose');
const Issue = require('./models/Issue');
require('dotenv').config();

async function clearAllIssues() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Count existing issues
    const issueCount = await Issue.countDocuments();
    console.log(`📊 Found ${issueCount} issues in database`);

    if (issueCount === 0) {
      console.log('✅ Database is already empty - no issues to delete');
      return;
    }

    // Delete all issues
    console.log('🗑️ Deleting all issues...');
    const result = await Issue.deleteMany({});
    
    console.log('✅ SUCCESS! All issues deleted from database');
    console.log(`📊 Deleted ${result.deletedCount} issues`);
    console.log('');
    console.log('🎯 Database is now clean and ready for new issues');
    console.log('');
    console.log('🔄 Refresh your admin dashboard to see the empty state');

  } catch (error) {
    console.error('❌ Error clearing issues:', error);
    console.log('Error details:', error.message);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the clear operation
if (require.main === module) {
  console.log('🗑️ CLEARING ALL ISSUES FROM DATABASE...');
  console.log('⚠️  This will permanently delete ALL issue data!');
  console.log('');
  clearAllIssues().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Clear operation failed:', error);
    process.exit(1);
  });
}

module.exports = { clearAllIssues };