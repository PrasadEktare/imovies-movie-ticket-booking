import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close menus whenever route changes
  useEffect(() => {
    setIsNavOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Handle clicking outside user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsNavOpen(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-dark py-3 sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-white"
          to="/"
          onClick={() => setIsNavOpen(false)}
        >
          <span className="badge bg-danger p-2 rounded-3">
            <i className="bi bi-film fs-5"></i>
          </span>
          <span>IMovies</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show mt-3 mt-lg-0' : ''}`} id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link
                className="nav-link text-light px-3"
                to="/"
                onClick={() => setIsNavOpen(false)}
              >
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link text-light px-3"
                  to="/my-bookings"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="bi bi-ticket-perforated me-1"></i> My Bookings
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link
                  className="nav-link text-warning fw-semibold px-3"
                  to="/admin"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="bi bi-speedometer2 me-1"></i> Admin Panel
                </Link>
              </li>
            )}
          </ul>

          {/* User Controls & Dropdown */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <div className="dropdown position-relative" ref={dropdownRef}>
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <i className="bi bi-person-circle"></i>
                  <span>{user.name}</span>
                  {isAdmin && <span className="badge bg-warning text-dark ms-1">Admin</span>}
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-dark dropdown-menu-end shadow ${
                    isDropdownOpen ? 'show position-absolute mt-2' : ''
                  }`}
                  style={{ right: 0 }}
                >
                  <li>
                    <span className="dropdown-item-text text-secondary small">
                      {user.email}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider border-secondary" /></li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/my-bookings"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsNavOpen(false);
                      }}
                    >
                      <i className="bi bi-ticket-detailed me-2"></i> My Bookings
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        className="dropdown-item text-warning"
                        to="/admin"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsNavOpen(false);
                        }}
                      >
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
              <div className="d-flex gap-2 w-100 w-lg-auto">
                <Link
                  to="/login"
                  className="btn btn-outline-light px-3 flex-fill text-center"
                  onClick={() => setIsNavOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-danger px-3 flex-fill text-center"
                  onClick={() => setIsNavOpen(false)}
                >
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
