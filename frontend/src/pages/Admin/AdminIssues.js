import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit,
  MapPin, 
  Calendar,
  User,
  SortAsc,
  SortDesc,
  Grid,
  List,
  RefreshCw,
  MessageSquare,
  Download,
  Plus,
  Navigation,
  Route,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import StatusBadge from '../../components/UI/StatusBadge';
import Modal from '../../components/UI/Modal';
import MapComponent from '../../components/Map/MapComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { getDirectionsToIssue, getRoutingOptions, calculateDistance, formatDistance } from '../../services/routingService';
import useGeolocation from '../../hooks/useGeolocation';

const AdminIssues = () => {
  const { user } = useAuth();
  const { location: adminLocation, getCurrentLocation } = useGeolocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get('priority') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('list');
  const [showMapModal, setShowMapModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showRoutingModal, setShowRoutingModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    priority: '',
    adminNote: '',
    noteIsPublic: false
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'duplicate', label: 'Duplicate' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'pothole', label: 'Pothole' },
    { value: 'street_light', label: 'Street Light' },
    { value: 'drainage', label: 'Drainage Problem' },
    { value: 'traffic_signal', label: 'Traffic Signal' },
    { value: 'road_damage', label: 'Road Damage' },
    { value: 'sidewalk', label: 'Sidewalk Issue' },
    { value: 'graffiti', label: 'Graffiti' },
    { value: 'garbage', label: 'Garbage/Litter' },
    { value: 'water_leak', label: 'Water Leak' },
    { value: 'park_maintenance', label: 'Park Maintenance' },
    { value: 'noise_complaint', label: 'Noise Complaint' },
    { value: 'other', label: 'Other' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'updatedAt', label: 'Last Updated' },
    { value: 'title', label: 'Title' },
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
    { value: 'category', label: 'Category' }
  ];

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    filterAndSortIssues();
    updateURLParams();
  }, [issues, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy, sortOrder]);

  const fetchIssues = async (page = 1) => {
    try {
      setLoading(true);
      // Use pagination to get all issues for admin - fetch multiple pages
      const allIssues = [];
      let currentPage = 1;
      let hasMore = true;
      
      while (hasMore && currentPage <= 10) { // Limit to 10 pages max (1000 issues)
        const response = await api.get(`/issues?limit=100&page=${currentPage}&sortBy=createdAt&sortOrder=desc`);
        const { issues, pagination } = response.data.data;
        
        allIssues.push(...issues);
        hasMore = pagination.hasNextPage;
        currentPage++;
      }
      
      setIssues(allIssues);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast.error('Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  const refreshIssues = async () => {
    try {
      setRefreshing(true);
      await fetchIssues();
      toast.success('Issues refreshed');
    } catch (error) {
      toast.error('Failed to refresh issues');
    } finally {
      setRefreshing(false);
    }
  };

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (priorityFilter !== 'all') params.set('priority', priorityFilter);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    setSearchParams(params);
  };

  const filterAndSortIssues = () => {
    let filtered = [...issues];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${issue.reportedBy?.firstName} ${issue.reportedBy?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredIssues(filtered);
  };

  const handleUpdateIssue = (issue) => {
    setSelectedIssue(issue);
    setUpdateData({
      status: issue.status,
      priority: issue.priority,
      adminNote: '',
      noteIsPublic: false
    });
    setShowUpdateModal(true);
  };

  const submitUpdate = async () => {
    if (!selectedIssue) return;

    try {
      const updatePayload = {};
      
      if (updateData.status !== selectedIssue.status) {
        updatePayload.status = updateData.status;
      }
      
      if (updateData.priority !== selectedIssue.priority) {
        updatePayload.priority = updateData.priority;
      }
      
      if (updateData.adminNote.trim()) {
        updatePayload.adminNote = updateData.adminNote.trim();
        updatePayload.noteIsPublic = updateData.noteIsPublic;
      }

      await api.put(`/issues/${selectedIssue._id}`, updatePayload);
      
      toast.success('Issue updated successfully');
      setShowUpdateModal(false);
      fetchIssues(); // Refresh the list
    } catch (error) {
      console.error('Error updating issue:', error);
      toast.error('Failed to update issue');
    }
  };

  const exportIssues = () => {
    // Create CSV content
    const csvContent = [
      // Header
      ['ID', 'Title', 'Category', 'Status', 'Priority', 'Reporter', 'Created', 'Location'].join(','),
      // Data rows
      ...filteredIssues.map(issue => [
        issue._id,
        `"${issue.title}"`,
        issue.category,
        issue.status,
        issue.priority,
        `"${issue.reportedBy?.firstName} ${issue.reportedBy?.lastName}"`,
        new Date(issue.createdAt).toLocaleDateString(),
        `"${issue.address?.formatted || 'N/A'}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `civic-issues-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Issues exported successfully');
  };

  const handleGetDirections = async (issue) => {
    try {
      await getDirectionsToIssue(issue, true);
      toast.success('Opening directions in Google Maps...');
    } catch (error) {
      console.error('Error getting directions:', error);
      toast.error('Failed to get directions: ' + error.message);
    }
  };

  const handleShowRoutingOptions = (issue) => {
    setSelectedIssue(issue);
    setShowRoutingModal(true);
  };

  const getIssueDistance = (issue) => {
    if (!adminLocation || !issue.location || !issue.location.coordinates) {
      return null;
    }
    
    const [issueLng, issueLat] = issue.location.coordinates;
    const distance = calculateDistance(
      adminLocation.lat, 
      adminLocation.lng, 
      issueLat, 
      issueLng
    );
    
    return formatDistance(distance);
  };

  const IssueCard = ({ issue, isGridView = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`cursor-pointer ${isGridView ? '' : 'mb-4'}`}
    >
      <Card className={`transition-all duration-200 hover:shadow-lg ${isGridView ? 'h-full' : ''}`}>
        <div className={`${isGridView ? 'space-y-4' : 'flex items-center space-x-4'}`}>
          {/* Image */}
          {issue.images && issue.images.length > 0 && (
            <div className={`${isGridView ? 'w-full h-32' : 'w-16 h-16'} flex-shrink-0`}>
              <img
                src={issue.images[0].url}
                alt={issue.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className={`${isGridView ? '' : 'flex-1 min-w-0'}`}>
            <div className={`${isGridView ? 'space-y-2' : 'flex items-start justify-between'}`}>
              <div className={`${isGridView ? '' : 'flex-1 min-w-0'}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {issue.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 ${isGridView ? 'text-sm line-clamp-2' : 'text-sm truncate'}`}>
                  {issue.description}
                </p>
                <div className={`${isGridView ? 'space-y-1 mt-2' : 'mt-1 flex items-center space-x-4'} text-xs text-gray-500 dark:text-gray-400`}>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    <span>{issue.reportedBy?.firstName} {issue.reportedBy?.lastName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">
                      {issue.address?.city || 'Location not available'}
                      {getIssueDistance(issue) && (
                        <span className="ml-1 text-blue-600 dark:text-blue-400">
                          ({getIssueDistance(issue)})
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {!isGridView && (
                <div className="flex items-center space-x-2 ml-4">
                  <StatusBadge status={issue.status} size="sm" />
                  <StatusBadge priority={issue.priority} size="sm" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className={`${isGridView ? 'mt-4 space-y-2' : 'mt-2 flex items-center justify-between'}`}>
              {isGridView && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={issue.status} size="sm" />
                    <StatusBadge priority={issue.priority} size="sm" />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {/* Routing Button */}
                {issue.location && issue.location.coordinates && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleGetDirections(issue)}
                    title="Get directions to this issue"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    {isGridView ? '' : 'Directions'}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUpdateIssue(issue)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isGridView ? '' : 'Update'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  as={Link}
                  to={`/issue/${issue._id}`}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {isGridView ? '' : 'View'}
                </Button>
                {issue.adminNotes && issue.adminNotes.length > 0 && (
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs ml-1">{issue.adminNotes.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading issues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Issues
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Review, update, and resolve civic issues reported by citizens
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              {/* Location Status */}
              <div className="flex items-center space-x-2">
                {adminLocation ? (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <Navigation className="w-4 h-4 mr-1" />
                    <span>Location enabled</span>
                  </div>
                ) : (
                  <Button
                    onClick={getCurrentLocation}
                    variant="ghost"
                    size="sm"
                    leftIcon={Navigation}
                    title="Enable location for distance calculations and routing"
                  >
                    Enable Location
                  </Button>
                )}
              </div>
              <Button
                onClick={refreshIssues}
                isLoading={refreshing}
                variant="outline"
                leftIcon={RefreshCw}
                size="sm"
              >
                Refresh
              </Button>
              <Button
                onClick={exportIssues}
                variant="outline"
                leftIcon={Download}
                size="sm"
              >
                Export
              </Button>
              <Button
                onClick={() => setShowMapModal(true)}
                variant="outline"
                leftIcon={MapPin}
                size="sm"
              >
                Map View
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={Search}
              />

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Sort Order */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredIssues.length} of {issues.length} issues
          </p>
        </motion.div>

        {/* Issues List/Grid */}
        {filteredIssues.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <IssueCard key={issue._id} issue={issue} isGridView={false} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.map((issue) => (
                  <IssueCard key={issue._id} issue={issue} isGridView={true} />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No matching issues found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}

        {/* Update Modal */}
        <Modal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title="Update Issue"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
                Cancel
              </Button>
              <Button onClick={submitUpdate}>
                Update Issue
              </Button>
            </>
          }
        >
          {selectedIssue && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {selectedIssue.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedIssue.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={updateData.status}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                    <option value="duplicate">Duplicate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={updateData.priority}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Admin Note (Optional)</label>
                <textarea
                  rows={3}
                  value={updateData.adminNote}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, adminNote: e.target.value }))}
                  placeholder="Add a note about this update..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="noteIsPublic"
                    checked={updateData.noteIsPublic}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, noteIsPublic: e.target.checked }))}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="noteIsPublic" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Make note visible to reporter
                  </label>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Map Modal */}
        <Modal
          isOpen={showMapModal}
          onClose={() => {
            setShowMapModal(false);
            setSelectedIssue(null); // Clear selection when closing
          }}
          title={selectedIssue ? `Route to: ${selectedIssue.title}` : "Issues Map View"}
          size="xl"
        >
          <div className="space-y-4">
            {/* Route Information */}
            {selectedIssue && adminLocation && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Route to Issue Location
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {selectedIssue.address?.formatted || 'Address not available'}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        🚗 Calculating route... (Real-time road directions)
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        const lat = selectedIssue.location.coordinates[1];
                        const lng = selectedIssue.location.coordinates[0];
                        window.open(`https://www.google.com/maps/dir/${adminLocation.lat},${adminLocation.lng}/${lat},${lng}`, '_blank');
                      }}
                    >
                      Open in Google Maps
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedIssue(null)}
                    >
                      Clear Route
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            {!selectedIssue && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Click on any issue marker to see the route from your location</span>
                </div>
              </div>
            )}

            {/* Map and Route Directions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Map */}
              <div className="lg:col-span-2">
                <MapComponent
                  height="500px"
                  issues={filteredIssues}
                  selectedIssue={selectedIssue}
                  adminLocation={adminLocation}
                  showRouting={true}
                  onIssueSelect={(issue) => {
                    setSelectedIssue(issue);
                    toast.success(`🗺️ Calculating route to: ${issue.title}`);
                  }}
                />
              </div>

              {/* Route Directions Panel */}
              {selectedIssue && (
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-[500px] overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                        Route Directions
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Turn-by-turn navigation
                      </p>
                    </div>
                    
                    <div className="p-4 space-y-4 overflow-y-auto h-[calc(500px-80px)]">
                      {/* Issue Details */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          🎯 Destination
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {selectedIssue.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {selectedIssue.address?.formatted || 'Address not available'}
                        </p>
                      </div>

                      {/* Route Summary */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Route Summary
                        </h4>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                            <span className="font-medium text-gray-900 dark:text-white" id="route-distance">
                              Calculating...
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                            <span className="font-medium text-gray-900 dark:text-white" id="route-duration">
                              Calculating...
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Turn-by-turn directions */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
                          📋 Directions
                        </h4>
                        <div id="route-steps" className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">1</span>
                            </div>
                            <span>Calculating turn-by-turn directions...</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              const lat = selectedIssue.location.coordinates[1];
                              const lng = selectedIssue.location.coordinates[0];
                              window.open(`https://www.google.com/maps/dir/${adminLocation.lat},${adminLocation.lng}/${lat},${lng}`, '_blank');
                            }}
                          >
                            🗺️ Open in Google Maps
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              const lat = selectedIssue.location.coordinates[1];
                              const lng = selectedIssue.location.coordinates[0];
                              window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
                            }}
                          >
                            🚗 Open in Waze
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              navigator.clipboard.writeText(`${selectedIssue.location.coordinates[1]}, ${selectedIssue.location.coordinates[0]}`);
                              toast.success('📋 Coordinates copied to clipboard');
                            }}
                          >
                            📋 Copy Coordinates
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>

        {/* Routing Options Modal */}
        <Modal
          isOpen={showRoutingModal}
          onClose={() => setShowRoutingModal(false)}
          title="Get Directions"
          size="md"
        >
          {selectedIssue && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedIssue.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{selectedIssue.address?.formatted || 'Address not available'}</span>
                </div>
                {getIssueDistance(selectedIssue) && (
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <Route className="w-4 h-4 mr-1" />
                    <span>Distance: {getIssueDistance(selectedIssue)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Choose Navigation App:</h4>
                
                {getRoutingOptions(selectedIssue).map((option, index) => (
                  <button
                    key={index}
                    onClick={async () => {
                      try {
                        const result = await option.action();
                        if (result) {
                          toast.success(result);
                        }
                        setShowRoutingModal(false);
                      } catch (error) {
                        toast.error('Failed to open navigation: ' + error.message);
                      }
                    }}
                    className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-2xl mr-3">{option.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto text-gray-400" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setShowRoutingModal(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminIssues;