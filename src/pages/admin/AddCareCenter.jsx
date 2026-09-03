// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API function
import { createCareCenter } from '../../services/api';
import './AddCareCenter.css';

function AddCareCenter() {
  // useNavigate for programmatic navigation after form submit
  const navigate = useNavigate();
  
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    address: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  // Get admin user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
    if (!formData.name) newErrors.name = 'Center name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
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
      // Send request to backend
      await createCareCenter(formData);
      alert('Care center added successfully!');
      navigate('/admin/centers'); // Redirect to care centers list
    } catch (error) {
      alert(error.message || 'Failed to add care center');
    } finally {
      setLoading(false);
    }
  };

  // Show message if admin not logged in
  if (!user) {
    return (
      <Layout userRole="Administrator" userName="Admin" userEmail="">
        <div className="add-carecenter">
          <p>Please login as admin to add care centers.</p>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user.name} userEmail={user.email}>
      <div className="add-carecenter">
        {/* Page Header with Back Button */}
        <div className="ac-header">
          <Link to="/admin/centers" className="ac-back-link">← Back to Care Centers</Link>
          <h1>Add Care Center</h1>
          <p className="ac-subtitle">Register a new care center.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="ac-form">
          <div className="ac-form-grid">
            {/* Left Column */}
            <div className="ac-form-left">
              {/* Center Name */}
              <div className="ac-form-group">
                <label>Center Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter care center name"
                />
                {errors.name && <span className="ac-error">{errors.name}</span>}
              </div>

              {/* Location */}
              <div className="ac-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                  placeholder="Enter city/location"
                />
                {errors.location && <span className="ac-error">{errors.location}</span>}
              </div>

              {/* Phone + Email (side by side) */}
              <div className="ac-form-row">
                <div className="ac-form-group">
                  <label>Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <span className="ac-error">{errors.phone}</span>}
                </div>
                <div className="ac-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="ac-form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                />
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="ac-form-right">
              <div className="ac-form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description of the care center..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="ac-form-actions">
            <button type="submit" className="ac-btn-submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Care Center'}
            </button>
            <Link to="/admin/centers" className="ac-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddCareCenter;