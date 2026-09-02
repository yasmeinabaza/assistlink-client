import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyUser } from '../../data/dummyData';
import './PatientProfile.css';

function PatientProfile() {
  const user = dummyUser;
  
  // Separate edit states for personal info and address
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dateOfBirth: '1985-03-14',
    careCenter: user.careCenter,
    careCenterLocation: user.careCenterLocation,
    careCenterPhone: user.careCenterPhone,
    streetAddress: '14 Maple Avenue, Apt 2B',
    city: 'Nairobi',
    postcode: '00100'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    alert('Personal information updated successfully! (Demo)');
    setEditingPersonal(false);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    alert('Delivery address updated successfully! (Demo)');
    setEditingAddress(false);
  };

  return (
    <Layout userRole="Patient" userName={user.name} userEmail={user.email}>
      <div className="patient-profile">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p className="profile-subtitle">Your personal information and care center.</p>
        </div>

        <div className="profile-grid">
          {/* Left - Personal Information */}
          <div className="profile-main">
            {/* Personal Information Card */}
            <div className="profile-card">
              <div className="card-header">
                <h3>Personal Information</h3>
                {!editingPersonal && (
                  <button className="btn-edit-profile" onClick={() => setEditingPersonal(true)}>
                    Edit
                  </button>
                )}
              </div>

              {!editingPersonal ? (
                // View Mode
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>Full Name</label>
                    <p>{formData.name}</p>
                  </div>
                  <div className="profile-info-item">
                    <label>Date of Birth</label>
                    <p>{formData.dateOfBirth}</p>
                  </div>
                  <div className="profile-info-item">
                    <label>Email</label>
                    <p>{formData.email}</p>
                  </div>
                  <div className="profile-info-item">
                    <label>Phone</label>
                    <p>{formData.phone}</p>
                  </div>
                  <div className="profile-info-item full-width">
                    <label>Member Since</label>
                    <p>{user.memberSince || '2025-01-10'}</p>
                  </div>
                </div>
              ) : (
                // Edit Mode - Personal Information
                <form onSubmit={handlePersonalSubmit} className="profile-edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-save">Save Changes</button>
                    <button type="button" className="btn-cancel" onClick={() => setEditingPersonal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Care Center Card */}
            <div className="profile-card">
              <h3>Care Center</h3>
              <div className="care-center-info">
                <div className="care-center-name">{formData.careCenter}</div>
                <div className="care-center-detail">{formData.careCenterLocation}</div>
                <div className="care-center-detail">📞 {formData.careCenterPhone}</div>
                <span className="care-center-status">Connected</span>
                <button className="btn-change-carecenter">Change</button>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="profile-card">
              <div className="card-header">
                <h3>Delivery Address</h3>
                {!editingAddress && (
                  <button className="btn-edit-profile" onClick={() => setEditingAddress(true)}>
                    Edit
                  </button>
                )}
              </div>

              {!editingAddress ? (
                <div className="address-display">
                  <p>{formData.streetAddress}</p>
                  <p>{formData.city}</p>
                  <p>{formData.postcode}</p>
                </div>
              ) : (
                // Edit Mode - Address Only
                <form onSubmit={handleAddressSubmit} className="address-edit-form">
                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City / Town</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Postcode</label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-save">Save Address</button>
                    <button type="button" className="btn-cancel" onClick={() => setEditingAddress(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <h3>Account Summary</h3>
              <div className="summary-item">
                <span className="summary-label">Member Since</span>
                <span className="summary-value">{user.memberSince || '2025-01-10'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Role</span>
                <span className="summary-value">Patient</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Care Center</span>
                <span className="summary-value">{user.careCenter}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Requests</span>
                <span className="summary-value">2</span>
              </div>
            </div>

            <div className="profile-card">
              <h3>Quick Actions</h3>
              <Link to="/patient/request/new" className="quick-action-btn">
                + New Request
              </Link>
              <Link to="/patient" className="quick-action-btn secondary">
                View My Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PatientProfile;