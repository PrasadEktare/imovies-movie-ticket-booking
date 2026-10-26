import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function BookingConfirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/bookings/${id}`);
      setBooking(res.data.booking);
    } catch (err) {
      console.error('Error fetching booking details:', err);
      setError('Could not retrieve booking details.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="text-secondary mt-3">Generating your digital cinema ticket...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error || 'Booking not found'}</div>
        <Link to="/" className="btn btn-outline-light mt-3">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <div className="display-4 text-success mb-2">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h2 className="fw-bold text-white mb-1">Booking Confirmed!</h2>
        <p className="text-secondary">
          Your e-ticket has been generated and sent to{' '}
          <span className="text-light fw-semibold">{booking.user?.email}</span>
        </p>
      </div>

      {/* Digital Cinema Ticket Card */}
      <div
        className="mx-auto shadow-lg rounded-4 overflow-hidden"
        style={{
          maxWidth: '680px',
          background: 'linear-gradient(145deg, #181a24 0%, #12131a 100%)',
          border: '1px solid #2d3142',
        }}
      >
        {/* Ticket Header */}
        <div className="bg-danger text-white p-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-film fs-3"></i>
            <div>
              <h5 className="fw-bold mb-0">IMovies E-TICKET</h5>
              <span className="small opacity-75">{booking.show?.theatreName}</span>
            </div>
          </div>
          <div className="text-end">
            <span className="badge bg-dark text-white text-uppercase px-2 py-1">
              {booking.show?.screenType || '2D'}
            </span>
            <div className="small opacity-75 mt-1">Ref: {booking.bookingReference}</div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-4">
          <div className="row g-4 align-items-center">
            {/* Poster thumbnail */}
            <div className="col-sm-4 text-center">
              <img
                src={booking.movie?.posterUrl}
                alt={booking.movie?.title}
                className="img-fluid rounded-3 shadow"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                }}
              />
            </div>

            {/* Info */}
            <div className="col-sm-8">
              <h4 className="fw-bold text-white mb-2">{booking.movie?.title}</h4>
              <div className="text-secondary small mb-3">
                {booking.movie?.language} • {booking.movie?.duration} mins
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="text-secondary small">Date</div>
                  <div className="text-white fw-bold">{booking.show?.showDate}</div>
                </div>
                <div className="col-6">
                  <div className="text-secondary small">Time</div>
                  <div className="text-white fw-bold">{booking.show?.showTime}</div>
                </div>
                <div className="col-6">
                  <div className="text-secondary small">Location</div>
                  <div className="text-white small">{booking.show?.theatreLocation}</div>
                </div>
                <div className="col-6">
                  <div className="text-secondary small">Booked For</div>
                  <div className="text-white small">{booking.user?.name}</div>
                </div>
              </div>

              {/* Seats Pill Section */}
              <div className="p-3 rounded-3 bg-black border border-secondary border-opacity-25 mb-3">
                <div className="text-secondary small mb-1">Confirmed Seats</div>
                <div className="d-flex flex-wrap gap-2">
                  {booking.seats.map((seat) => (
                    <span key={seat} className="badge bg-success fs-6 px-3 py-1">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="text-secondary">Total Paid</span>
                <span className="fs-4 fw-bold text-success">₹{booking.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Perforated Divider Bar */}
        <div className="d-flex align-items-center px-4 py-2 bg-dark bg-opacity-75 border-top border-bottom border-secondary border-opacity-25">
          <div className="flex-grow-1 text-secondary font-monospace small text-truncate">
            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••
          </div>
          <span className="badge bg-success ms-3">PAID & VERIFIED</span>
        </div>

        {/* Barcode & Scan Section */}
        <div className="p-4 bg-black d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="text-secondary small font-monospace">BOOKING CODE</div>
            <div className="fs-5 fw-bold text-white font-monospace tracking-widest">
              {booking.bookingReference}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-qr-code fs-1 text-light"></i>
            <div className="small text-secondary" style={{ maxWidth: '140px', fontSize: '10px' }}>
              Present this code or QR at the cinema scanner for admission.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-outline-light px-4 py-2" onClick={handlePrint}>
          <i className="bi bi-printer me-2"></i> Print Ticket
        </button>
        <Link to="/my-bookings" className="btn btn-dark border-secondary px-4 py-2">
          <i className="bi bi-ticket-perforated me-2"></i> My Bookings
        </Link>
        <Link to="/" className="btn btn-danger px-4 py-2">
          <i className="bi bi-film me-2"></i> Book Another Movie
        </Link>
      </div>
    </div>
  );
}

export default BookingConfirmation;
