import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import SeatMatrix from '../components/SeatMatrix';

function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShowDetails();
  }, [showId]);

  const fetchShowDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get(`/shows/${showId}`);
      setShow(res.data.show);
    } catch (err) {
      console.error('Error loading show details:', err);
      setError('Could not fetch seat availability for this show.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSeat = (seatObj) => {
    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.seatNumber === seatObj.seatNumber);
      if (exists) {
        return prev.filter((s) => s.seatNumber !== seatObj.seatNumber);
      } else {
        if (prev.length >= 8) {
          alert('You can select a maximum of 8 seats per booking.');
          return prev;
        }
        return [...prev, seatObj];
      }
    });
  };

  // Pricing breakdown calculations
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const convenienceFee = selectedSeats.length > 0 ? selectedSeats.length * 30 : 0;
  const taxes = Math.round(convenienceFee * 0.18);
  const grandTotal = subtotal + convenienceFee + taxes;

  const handleConfirmBooking = async () => {
    if (!user) {
      // Save current path to return after login
      navigate('/login', { state: { returnUrl: `/book/${showId}` } });
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Please select at least one seat to proceed.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const payload = {
        showId: show._id,
        seats: selectedSeats.map((s) => s.seatNumber),
        seatDetails: selectedSeats,
        totalAmount: grandTotal,
      };

      const res = await api.post('/bookings', payload);
      const newBooking = res.data.booking;

      // Navigate to confirmation page
      navigate(`/confirmation/${newBooking._id}`);
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.message || 'Failed to complete booking. Please try again.');
      // Refresh seat layout to catch newly booked seats
      fetchShowDetails();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="text-secondary mt-3">Loading interactive seat layout...</p>
      </div>
    );
  }

  if (error && !show) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-outline-light">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Top Breadcrumb & Show Details Header */}
      <div className="card bg-dark border-secondary border-opacity-25 p-3 mb-4 rounded-4 shadow-sm">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-danger">{show.screenType}</span>
              <h4 className="fw-bold text-white mb-0">{show.movie?.title}</h4>
            </div>
            <p className="small text-secondary mb-0">
              <i className="bi bi-geo-alt text-danger me-1"></i>
              {show.theatreName} ({show.theatreLocation}) •{' '}
              <i className="bi bi-calendar3 me-1"></i>
              {show.showDate} at{' '}
              <span className="text-white fw-bold">{show.showTime}</span>
            </p>
          </div>

          <Link
            to={`/movie/${show.movie?._id}`}
            className="btn btn-sm btn-outline-secondary text-light"
          >
            <i className="bi bi-arrow-left me-1"></i> Change Showtime
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Main Grid: Interactive Seat Matrix + Booking Summary Drawer */}
      <div className="row g-4">
        {/* Left Column: Interactive Seat Grid */}
        <div className="col-lg-8">
          <div className="card bg-black border-dark p-4 rounded-4 shadow">
            <SeatMatrix
              bookedSeats={show.bookedSeats || []}
              selectedSeats={selectedSeats}
              onToggleSeat={handleToggleSeat}
              ticketPrices={show.ticketPrice}
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Card */}
        <div className="col-lg-4">
          <div className="card bg-dark border-secondary border-opacity-25 p-4 rounded-4 sticky-top shadow-lg" style={{ top: '90px' }}>
            <h5 className="fw-bold text-white mb-3 d-flex align-items-center justify-content-between">
              <span>Booking Summary</span>
              <i className="bi bi-receipt-cutoff text-danger"></i>
            </h5>

            <div className="mb-3">
              <div className="text-secondary small">Movie</div>
              <div className="text-white fw-bold">{show.movie?.title}</div>
            </div>

            <div className="mb-3">
              <div className="text-secondary small">Cinema & Time</div>
              <div className="text-white small">
                {show.theatreName} • {show.showTime}
              </div>
            </div>

            <hr className="border-secondary border-opacity-25" />

            {/* Selected Seats Chips */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary small">Selected Seats</span>
                <span className="badge bg-secondary">{selectedSeats.length} Selected</span>
              </div>

              {selectedSeats.length === 0 ? (
                <div className="text-secondary small fst-italic">
                  Click on any available seat on the grid to begin.
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.seatNumber}
                      className="badge bg-success bg-opacity-25 text-success border border-success d-flex align-items-center gap-1 px-2 py-1"
                    >
                      <i className="bi bi-check-circle-fill"></i>
                      {seat.seatNumber} ({seat.tier})
                    </span>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-secondary border-opacity-25" />

            {/* Price Calculations */}
            <div className="d-flex flex-column gap-2 small text-secondary mb-3">
              <div className="d-flex justify-content-between">
                <span>Tickets Subtotal</span>
                <span className="text-white fw-semibold">₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Convenience Fee</span>
                <span className="text-white">₹{convenienceFee}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Integrated GST (18%)</span>
                <span className="text-white">₹{taxes}</span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center py-2 px-3 rounded-3 bg-black border border-secondary border-opacity-25 mb-4">
              <span className="fw-bold text-light">Total Payable</span>
              <span className="fs-4 fw-black text-danger">₹{grandTotal}</span>
            </div>

            {/* Checkout Action */}
            <button
              className="btn btn-danger w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow"
              disabled={selectedSeats.length === 0 || submitting}
              onClick={handleConfirmBooking}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Confirming Seats...</span>
                </>
              ) : user ? (
                <>
                  <i className="bi bi-credit-card fs-5"></i>
                  <span>Pay ₹{grandTotal} & Book</span>
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right fs-5"></i>
                  <span>Sign In & Book Seats</span>
                </>
              )}
            </button>

            {!user && (
              <p className="text-secondary small text-center mt-2 mb-0" style={{ fontSize: '11px' }}>
                You will be prompted to log in or register before final booking confirmation.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
