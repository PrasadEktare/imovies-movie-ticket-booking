import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-secondary py-5 mt-auto border-top border-dark">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="badge bg-danger p-2 rounded">
                <i className="bi bi-film"></i>
              </span>
              IMovies
            </h5>
            <p className="small text-secondary">
              Your premier digital movie ticket booking platform. Discover the latest blockbusters, choose your favorite seats in real-time, and experience cinema at its finest.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-semibold mb-3">Cinema Tech</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><span className="text-secondary">IMAX 3D with Laser</span></li>
              <li><span className="text-secondary">Dolby Atmos Surround</span></li>
              <li><span className="text-secondary">4DX Multi-Sensory</span></li>
              <li><span className="text-secondary">Gold Class VIP Lounges</span></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-semibold mb-3">Demo Credentials</h6>
            <div className="bg-dark p-3 rounded-3 border border-secondary border-opacity-25 small">
              <div className="mb-2">
                <span className="text-warning fw-bold">Admin:</span> admin@imovies.com / admin123
              </div>
              <div>
                <span className="text-info fw-bold">User:</span> demo@imovies.com / demo123
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-semibold mb-3">Newsletter</h6>
            <p className="small text-secondary mb-2">Subscribe for premiere updates & discounts.</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control form-control-sm bg-dark border-secondary text-white"
                placeholder="Enter email"
              />
              <button className="btn btn-danger btn-sm" type="button">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-top border-secondary border-opacity-25 d-flex flex-wrap justify-content-between align-items-center small">
          <p className="mb-0 text-secondary">
            &copy; {new Date().getFullYear()} IMovies Entertainment Platform. All rights reserved.
          </p>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <span className="text-secondary">Privacy Policy</span>
            <span className="text-secondary">Terms of Service</span>
            <span className="text-secondary">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
