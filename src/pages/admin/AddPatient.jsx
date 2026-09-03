// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { signup, getCareCenters } from '../../services/api';
import './AddPatient.css';

function AddPatient() {
  // useNavigate for programmatic navigation after form submit
  const navigate = useNavigate();
  
  // State variables
  const [user, setUser] = useState(null);
  const [careCenters, setCareCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    careCenterId: '',
    address: '',
    city: '',
    postcode: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Get admin user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch care centers for dropdown
  useEffect(() => {
    const fetchCareCenters = async () => {
      try {
        const data = await getCareCenters();
        setCareCenters(data);
      } catch (error) {
        console.error('Error fetching care centers:', error);
      }
    };
    fetchCareCenters();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form before submitting
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.careCenterId) newErrors.careCenterId = 'Please select a care center';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page refresh
    
    // Validate form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Prepare data for API call - use signup endpoint with role 'patient'
      const patientData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        role: 'patient',
        careCenterId: parseInt(formData.careCenterId)
      };

      // Send request to backend
      await signup(patientData);
      alert('Patient added successfully!');
      navigate('/admin/patients'); // Redirect to patients list
    } catch (error) {
      alert(error.message || 'Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  // Show message if admin not logged in
  if (!user) {
    return (
      <Layout userRole="Administrator" userName="Admin" userEmail="">
        <div className="add-patient">
          <p>Please login as admin to add patients.</p>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user.name} userEmail={user.email}>
      <div className="add-patient">
        {/* Page Header with Back Button */}
        <div className="ap-header">
          <Link to="/admin/patients" className="ap-back-link">← Back to Patients</Link>
          <h1>Add New Patient</h1>
          <p className="ap-subtitle">Create a new patient account.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="ap-form">
          <div className="ap-form-grid">
            {/* Left Column - Personal Info + Care Center */}
            <div className="ap-form-left">
              <div className="ap-form-section">
                <h3>Personal Information</h3>
                
                {/* Full Name */}
                <div className="ap-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter full name"
                  />
                  {errors.name && <span className="ap-error">{errors.name}</span>}
                </div>

                {/* Email + Phone (side by side) */}
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter email address"
                    />
                    {errors.email && <span className="ap-error">{errors.email}</span>}
                  </div>
                  <div className="ap-form-group">
                    <label>Phone *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <span className="ap-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="ap-form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? 'error' : ''}
                  />
                  {errors.dateOfBirth && <span className="ap-error">{errors.dateOfBirth}</span>}
                </div>
              </div>

              {/* Care Center Assignment */}
              <div className="ap-form-section">
                <h3>Care Center Assignment</h3>
                <div className="ap-form-group">
                  <label>Care Center *</label>
                  <select
                    name="careCenterId"
                    value={formData.careCenterId}
                    onChange={handleChange}
                    className={errors.careCenterId ? 'error' : ''}
                  >
                    <option value="">Select a care center...</option>
                    {careCenters.map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {c.location}</option>
                    ))}
                  </select>
                  {errors.careCenterId && <span className="ap-error">{errors.careCenterId}</span>}
                </div>
              </div>
            </div>

            {/* Right Column - Address + Security */}
            <div className="ap-form-right">
              <div className="ap-form-section">
                <h3>Delivery Address</h3>
                
                {/* Street Address */}
                <div className="ap-form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street address"
                  />
                </div>
                
                {/* City + Postcode (side by side) */}
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label>City / Town</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="ap-form-group">
                    <label>Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div className="ap-form-section">
                <h3>Account Security</h3>
                
                {/* Password */}
                <div className="ap-form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter password"
                  />
                  {errors.password && <span className="ap-error">{errors.password}</span>}
                </div>
                
                {/* Confirm Password */}
                <div className="ap-form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <span className="ap-error">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="ap-form-actions">
            <button type="submit" className="ap-btn-submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Patient'}
            </button>
            <Link to="/admin/patients" className="ap-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddPatient;