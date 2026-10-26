import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-dark py-3 sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-white" to="/">
          <span className="badge bg-danger p-2 rounded-3">
            <i className="bi bi-film fs-5"></i>
          </span>
          <span>IMovies</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-light px-3" to="/my-bookings">
                  <i className="bi bi-ticket-perforated me-1"></i> My Bookings
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-semibold px-3" to="/admin">
                  <i className="bi bi-speedometer2 me-1"></i> Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                  <span>{user.name}</span>
                  {isAdmin && <span className="badge bg-warning text-dark ms-1">Admin</span>}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                  <li>
                    <span className="dropdown-item-text text-secondary small">
                      {user.email}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider border-secondary" /></li>
                  <li>
                    <Link className="dropdown-item" to="/my-bookings">
                      <i className="bi bi-ticket-detailed me-2"></i> My Bookings
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item text-warning" to="/admin">
                        <i className="bi bi-gear me-2"></i> Admin Panel
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider border-secondary" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light px-3">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-danger px-3">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
