import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card bg-dark border-secondary border-opacity-25 p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <span className="badge bg-danger p-2 rounded-3 mb-2">
            <i className="bi bi-person-plus fs-3"></i>
          </span>
          <h3 className="fw-bold text-white mb-1">Create Account</h3>
          <p className="text-secondary small">Join IMovies to book seats & receive exclusive offers</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-circle-fill"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control bg-black border-secondary text-white"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control bg-black border-secondary text-white"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control bg-black border-secondary text-white"
              placeholder="+1 555 123 4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="row g-2 mb-4">
            <div className="col-6">
              <label className="form-label text-light small fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control bg-black border-secondary text-white"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label text-light small fw-semibold">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control bg-black border-secondary text-white"
                placeholder="••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        <div className="text-center text-secondary small">
          Already have an account?{' '}
          <Link to="/login" className="text-danger text-decoration-none fw-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
