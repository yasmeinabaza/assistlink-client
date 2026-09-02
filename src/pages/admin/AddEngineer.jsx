import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin } from '../../data/dummyData';
import './AddEngineer.css';

function AddEngineer() {
  const navigate = useNavigate();
  const admin = dummyAdmin;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert('Engineer added successfully! (Demo)');
    navigate('/admin/engineers');
  };

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="add-engineer">
        <div className="ae-header">
          <Link to="/admin/engineers" className="ae-back-link">← Back to Engineers</Link>
          <h1>Add New Engineer</h1>
          <p className="ae-subtitle">Register a new engineer.</p>
        </div>

        <form onSubmit={handleSubmit} className="ae-form">
          <div className="ae-form-grid">
            <div className="ae-form-left">
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

            <div className="ae-form-right">
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

          <div className="ae-form-actions">
            <button type="submit" className="ae-btn-submit">Add Engineer</button>
            <Link to="/admin/engineers" className="ae-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddEngineer;