// Import React hooks and components
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequestById, updateRequestStatus, getEngineers, searchDevices } from '../../services/api';
import './ReviewRequest.css';

function ReviewRequest() {
  // useParams gets the 'id' from URL: /care-center/request/:id
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State variables
  const [request, setRequest] = useState(null);
  const [user, setUser] = useState(null);
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  //API variables
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch data when component mounts
  useEffect(() => {
    if (id && user) {
      fetchData();
    }
  }, [id, user]);

  // Function to fetch request details and engineers list
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both request details and engineers in parallel
      const [requestData, engineersData] = await Promise.all([
        getRequestById(id),
        getEngineers()
      ]);
      setRequest(requestData);
      setEngineers(engineersData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Function to search for devices in Third party API
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term.');
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      const results = await searchDevices(searchTerm);
      setSearchResults(results);
      if (results.length === 0) {
        setSearchError('No devices found matching your search.');
      }
    } catch (err) {
      setSearchError(err.message || 'Failed to search devices.');
    } finally {
      setIsSearching(false);
    }
  };

  // Function to select a device
  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
  };

    // Handle approve request
    const handleApprove = async () => {
      // Validate that an engineer is selected
      if (!selectedEngineer) {
        alert('Please select an engineer.');
        return;
      }

      setSubmitting(true);
      try {
        // Send status update to backend
        await updateRequestStatus(id, {
          status: 'Approved',
          engineerId: parseInt(selectedEngineer)
        });
        alert(`Request ${request.request_number} approved!`);
        navigate('/care-center'); // Redirect to dashboard
      } catch (err) {
        alert(err.message || 'Failed to approve request');
      } finally {
        setSubmitting(false);
      }
    };


  // Handle reject request
  const handleReject = async () => {
    // Confirm with user before rejecting
    if (window.confirm(`Reject request ${request?.request_number}?`)) {
      setSubmitting(true);
      try {
        await updateRequestStatus(id, { status: 'Rejected' });
        alert(`Request ${request.request_number} rejected.`);
        navigate('/care-center');
      } catch (err) {
        alert(err.message || 'Failed to reject request');
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="review-request-page">
          <div className="loading-text">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error || !request) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="review-request-page">
          <div className="not-found">Request not found</div>
          <Link to="/care-center" className="back-link">← Back to Dashboard</Link>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
      <div className="review-request-page">
        {/* Back button */}
        <Link to="/care-center" className="back-link">← Back</Link>

        {/* Request Header with Status Badge */}
        <div className="review-header">
          <h1>{request.request_number}</h1>
          <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
            {request.status}
          </span>
        </div>
        <p className="review-submitted">Submitted {request.submitted_date}</p>

        <div className="review-grid">
          {/* ============================================ */}
          {/* LEFT COLUMN - Request Information */}
          {/* ============================================ */}
          <div className="review-main">
            {/* Patient Information */}
            <div className="info-card">
              <h3>Patient Information</h3>
              <div className="info-row"><strong>Patient Name:</strong> {request.patient_name}</div>
              <div className="info-row"><strong>Email:</strong> {request.patient_email || 'N/A'}</div>
              <div className="info-row"><strong>Phone:</strong> {request.patient_phone || 'N/A'}</div>
              <div className="info-row"><strong>Device Type:</strong> {request.device_type}</div>
              <div className="info-row"><strong>Reason:</strong> {request.reason}</div>
              <div className="info-row"><strong>Affected Area:</strong> {request.affected_area || 'Not specified'}</div>
            </div>

            {/* Patient Notes */}
            <div className="info-card">
              <h3>Patient Notes</h3>
              <p className="notes-text">{request.notes || 'No notes provided.'}</p>
            </div>

            {/* Delivery Address */}
            <div className="info-card">
              <h3>Delivery Address</h3>
              <p className="address-text">{request.delivery_address || '14 Maple Avenue, Apt 2B, Nairobi 00100'}</p>
            </div>
          </div>

          {/* ============================================ */}
          {/* RIGHT COLUMN - Actions */}
          {/* ============================================ */}
          <div className="review-sidebar">
              {/*Device Search Section*/}
            <div className="action-card">
              <h3>Select Device</h3>
              <p className="search-hint">Search the AccessGUDID database to identify an appropriate device.</p>
    
              {/* Search Bar */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search for a device..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>

              {/* Loading State */}
              {isSearching && (
                <div className="search-status loading">Searching for devices...</div>
              )}

              {/* Error State */}
              {searchError && !isSearching && (
                <div className="search-status error">{searchError}</div>
              )}

              {/* Empty State */}
              {!isSearching && !searchError && searchTerm && searchResults.length === 0 && (
                <div className="search-status empty">No devices found. Try a different search term.</div>
              )}

              {/* Results List */}
              {!isSearching && searchResults.length > 0 && (
                <div className="search-results">
                  <p className="results-count">{searchResults.length} devices found</p>
                  {searchResults.map((device) => (
                    <div
                      key={device.deviceId}
                      className={`device-result ${selectedDevice?.deviceId === device.deviceId ? 'selected' : ''}`}
                      onClick={() => handleSelectDevice(device)}
                    >
                      <div className="device-header">
                        <span className="device-name">{device.brandName || 'Unknown Device'}</span>
                        <span className="device-company">{device.companyName || ''}</span>
                      </div>
                      <div className="device-details">
                        {device.gmdnTerms?.gmdn?.map(g => (
                          <span key={g.gmdnCode} className="device-gmdn">{g.gmdnPTName}</span>
                       ))}
                      </div>
                      <div className="device-meta">
                        <span>ID: {device.deviceId}</span>
                        <span>Model: {device.versionModelNumber || 'N/A'}</span>
                      </div>
                      {selectedDevice?.deviceId === device.deviceId && (
                        <span className="selected-badge">✓ Selected</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Device Info */}
              {selectedDevice && (
                <div className="selected-device-info">
                  <span><strong>Selected:</strong> {selectedDevice.brandName}</span>
                  <button className="btn-clear-selection" onClick={() => setSelectedDevice(null)}>
                    Clear
                  </button>
                </div>
              )}
            </div>
            <div className="action-card">
              <h3>Assign Engineer</h3>
              {/* Dropdown to select engineer */}
              <select
                className="engineer-select"
                value={selectedEngineer}
                onChange={(e) => setSelectedEngineer(e.target.value)}
              >
                <option value="">Select engineer...</option>
                {engineers.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} - {e.specialization}
                  </option>
                ))}
              </select>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className="btn-approve"
                  onClick={handleApprove}
                  disabled={submitting || !selectedEngineer}
                >
                  {submitting ? 'Processing...' : 'Approve Request'}
                </button>
                <button 
                  className="btn-reject"
                  onClick={handleReject}
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Reject Request'}
                </button>
              </div>
              
              {/* Warning if no engineer selected */}
              {!selectedEngineer && (
                <p className="warning-text">Please select an engineer before approving.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewRequest;