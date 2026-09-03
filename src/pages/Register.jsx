import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, getCareCenters } from '../services/api';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [careCenters, setCareCenters] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    role: 'patient',
    careCenterId: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.careCenterId) newErrors.careCenterId = 'Please select a care center';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        role: formData.role,
        careCenterId: parseInt(formData.careCenterId)
      };

      await signup(userData);
      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (error) {
      setApiError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Register to submit and track your assistive device requests.</p>
        </div>

        {apiError && <div className="auth-error">{apiError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter full name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Care Center *</label>
            <select
              name="careCenterId"
              value={formData.careCenterId}
              onChange={handleChange}
              className={errors.careCenterId ? 'error' : ''}
            >
              <option value="">Select a care center...</option>
              {careCenters.map(center => (
                <option key={center.id} value={center.id}>
                  {center.name} - {center.location}
                </option>
              ))}
            </select>
            {errors.careCenterId && <span className="error-text">{errors.careCenterId}</span>}
          </div>

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;