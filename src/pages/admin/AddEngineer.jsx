// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { signup, createEngineer } from '../../services/api';
import './AddEngineer.css';

function AddEngineer() {
  // useNavigate for programmatic navigation after form submit
  const navigate = useNavigate();
  
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
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
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
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
      // Step 1: Create user with role 'engineer'
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 'engineer'
      };
      
      const userResult = await signup(userData);
      const userId = userResult.user.id;
      
      // Step 2: Create engineer record linked to user
      await createEngineer({
        userId: userId,
        specialization: formData.specialization,
        status: 'active'
      });
      
      alert('Engineer added successfully!');
      navigate('/admin/engineers'); // Redirect to engineers list
    } catch (error) {
      alert(error.message || 'Failed to add engineer');
    } finally {
      setLoading(false);
    }
  };

  // Show message if admin not logged in
  if (!user) {
    return (
      <Layout userRole="Administrator" userName="Admin" userEmail="">
        <div className="add-engineer">
          <p>Please login as admin to add engineers.</p>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user.name} userEmail={user.email}>
      <div className="add-engineer">
        {/* Page Header with Back Button */}
        <div className="ae-header">
          <Link to="/admin/engineers" className="ae-back-link">← Back to Engineers</Link>
          <h1>Add New Engineer</h1>
          <p className="ae-subtitle">Register a new engineer.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="ae-form">
          <div className="ae-form-grid">
            {/* Left Column */}
            <div className="ae-form-left">
              {/* Full Name */}
              <div className="ae-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="ae-error">{errors.name}</span>}
              </div>

              {/* Email + Phone (side by side) */}
              <div className="ae-form-row">
                <div className="ae-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="ae-error">{errors.email}</span>}
                </div>
                <div className="ae-form-group">
                  <label>Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <span className="ae-error">{errors.phone}</span>}
                </div>
              </div>

              {/* Specialization Dropdown */}
              <div className="ae-form-group">
                <label>Specialization *</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={errors.specialization ? 'error' : ''}
                >
                  <option value="">Select specialization...</option>
                  <option value="Prosthetics">Prosthetics</option>
                  <option value="Orthotics">Orthotics</option>
                  <option value="General">General</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Biomechanics">Biomechanics</option>
                </select>
                {errors.specialization && <span className="ae-error">{errors.specialization}</span>}
              </div>
            </div>

            {/* Right Column - Password */}
            <div className="ae-form-right">
              {/* Password */}
              <div className="ae-form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter password"
                />
                {errors.password && <span className="ae-error">{errors.password}</span>}
              </div>
              
              {/* Confirm Password */}
              <div className="ae-form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && <span className="ae-error">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="ae-form-actions">
            <button type="submit" className="ae-btn-submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Engineer'}
            </button>
            <Link to="/admin/engineers" className="ae-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddEngineer;