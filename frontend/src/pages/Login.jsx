import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const returnUrl = location.state?.returnUrl || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate(returnUrl);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoUser = () => {
    setEmail('demo@imovies.com');
    setPassword('demo123');
  };

  const handleFillAdmin = () => {
    setEmail('admin@imovies.com');
    setPassword('admin123');
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div className="card bg-dark border-secondary border-opacity-25 p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <span className="badge bg-danger p-2 rounded-3 mb-2">
            <i className="bi bi-film fs-3"></i>
          </span>
          <h3 className="fw-bold text-white mb-1">Welcome Back</h3>
          <p className="text-secondary small">Sign in to book seats & manage your tickets</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-circle-fill"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-black border-secondary text-secondary">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control bg-black border-secondary text-white"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-black border-secondary text-secondary">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control bg-black border-secondary text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Demo Quick Fill Buttons */}
        <div className="p-3 rounded-3 bg-black border border-secondary border-opacity-25 mb-3 text-center">
          <div className="text-secondary small mb-2 fw-semibold">Quick Testing Credentials:</div>
          <div className="d-flex gap-2 justify-content-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-info"
              onClick={handleFillDemoUser}
            >
              Demo User
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-warning"
              onClick={handleFillAdmin}
            >
              Admin User
            </button>
          </div>
        </div>

        <div className="text-center text-secondary small">
          Don't have an account?{' '}
          <Link to="/register" className="text-danger text-decoration-none fw-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
