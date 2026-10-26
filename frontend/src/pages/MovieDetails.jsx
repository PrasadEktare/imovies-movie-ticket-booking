import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data.movie);
      const fetchedShows = res.data.shows || [];
      setShows(fetchedShows);

      // Set initial selected date to the first available show date, or today
      if (fetchedShows.length > 0) {
        setSelectedDate(fetchedShows[0].showDate);
      } else {
        setSelectedDate(new Date().toISOString().split('T')[0]);
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Could not load movie information.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="text-secondary mt-3">Loading movie details & showtimes...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error || 'Movie not found.'}</div>
        <Link to="/" className="btn btn-outline-light mt-3">Back to Catalog</Link>
      </div>
    );
  }

  // Get unique show dates
  const availableDates = Array.from(new Set(shows.map((s) => s.showDate)));

  // Filter shows by selected date
  const filteredShows = shows.filter((s) => s.showDate === selectedDate);

  // Group shows by theatre
  const groupedTheatres = filteredShows.reduce((acc, show) => {
    const theatreKey = show.theatreName;
    if (!acc[theatreKey]) {
      acc[theatreKey] = {
        name: show.theatreName,
        location: show.theatreLocation,
        shows: [],
      };
    }
    acc[theatreKey].shows.push(show);
    return acc;
  }, {});

  return (
    <div>
      {/* Movie Banner Backdrop Header */}
      <div
        className="position-relative text-white py-5"
        style={{
          background: `linear-gradient(to bottom, rgba(15,16,22,0.85) 0%, rgba(15,16,22,0.98) 100%), url(${movie.bannerUrl || movie.posterUrl}) center/cover no-repeat`,
        }}
      >
        <div className="container">
          <Link to="/" className="btn btn-sm btn-outline-secondary text-light mb-4">
            <i className="bi bi-arrow-left me-1"></i> Back to Catalog
          </Link>

          <div className="row align-items-center g-4">
            {/* Poster */}
            <div className="col-lg-3 col-md-4">
              <div className="movie-poster-wrapper shadow-lg rounded-4 overflow-hidden border border-secondary border-opacity-25">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="col-lg-9 col-md-8">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-danger text-uppercase px-2 py-1">
                  {movie.status === 'now_showing' ? 'Now Showing' : 'Upcoming'}
                </span>
                <span className="badge bg-dark border border-secondary text-light">
                  {movie.language}
                </span>
                {movie.rating > 0 && (
                  <span className="badge bg-warning text-dark fw-bold d-flex align-items-center gap-1">
                    <i className="bi bi-star-fill"></i> {movie.rating.toFixed(1)} / 10
                  </span>
                )}
              </div>

              <h1 className="display-5 fw-bold text-white mb-2">{movie.title}</h1>

              <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small mb-3">
                <span>
                  <i className="bi bi-clock me-1 text-danger"></i>
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </span>
                <span>•</span>
                <span>
                  <i className="bi bi-calendar-event me-1 text-danger"></i>
                  {new Date(movie.releaseDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span>{movie.genre?.join(', ')}</span>
              </div>

              <p className="lead text-light opacity-90 fs-6 mb-4" style={{ maxWidth: '800px' }}>
                {movie.description}
              </p>

              {movie.director && (
                <div className="mb-2 small">
                  <span className="text-secondary">Director: </span>
                  <span className="text-white fw-semibold">{movie.director}</span>
                </div>
              )}

              {movie.cast?.length > 0 && (
                <div className="mb-4 small">
                  <span className="text-secondary">Starring: </span>
                  <span className="text-white fw-semibold">{movie.cast.join(', ')}</span>
                </div>
              )}

              {movie.trailerUrl && (
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-youtube fs-6"></i>
                  <span>Watch Official Trailer</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes & Booking Section */}
      <div className="container py-5">
        <div className="border-bottom border-dark pb-3 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <h3 className="fw-bold text-white mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-calendar2-week text-danger"></i>
            <span>Select Date & Showtimes</span>
          </h3>

          {/* Date Picker Buttons */}
          <div className="d-flex gap-2 overflow-auto">
            {availableDates.length > 0 ? (
              availableDates.map((dateStr) => {
                const dateObj = new Date(dateStr);
                const dayName = dateObj.toLocaleDateString(undefined, { weekday: 'short' });
                const monthDay = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={dateStr}
                    className={`btn text-center px-3 py-2 rounded-3 ${
                      isSelected
                        ? 'btn-danger shadow-sm'
                        : 'btn-dark border border-secondary text-light'
                    }`}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    <div className="small text-uppercase fw-bold opacity-75">{dayName}</div>
                    <div className="fw-bold">{monthDay}</div>
                  </button>
                );
              })
            ) : (
              <span className="text-secondary small">No show dates scheduled yet.</span>
            )}
          </div>
        </div>

        {/* Theatres & Times List */}
        {Object.keys(groupedTheatres).length === 0 ? (
          <div className="text-center py-5 bg-dark bg-opacity-25 rounded-4 border border-secondary border-opacity-25">
            <i className="bi bi-ticket-perforated display-5 text-secondary mb-2 d-block"></i>
            <h5 className="text-white">No showtimes available for this date</h5>
            <p className="text-secondary small">Please select another date above or check back soon.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {Object.values(groupedTheatres).map((theatre) => (
              <div
                key={theatre.name}
                className="p-4 rounded-4 bg-dark bg-opacity-50 border border-secondary border-opacity-25 shadow-sm"
              >
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary border-opacity-25">
                  <div>
                    <h5 className="fw-bold text-white mb-1">
                      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                      {theatre.name}
                    </h5>
                    <p className="small text-secondary mb-0">{theatre.location}</p>
                  </div>
                  <div className="d-flex gap-2 mt-2 mt-sm-0">
                    <span className="badge bg-secondary bg-opacity-25 text-info small">
                      <i className="bi bi-badge-hd me-1"></i> M-Ticket Available
                    </span>
                    <span className="badge bg-secondary bg-opacity-25 text-warning small">
                      <i className="bi bi-cup-straw me-1"></i> Food & Beverages
                    </span>
                  </div>
                </div>

                {/* Showtimes Pill List */}
                <div className="d-flex flex-wrap gap-3">
                  {theatre.shows.map((show) => {
                    const bookedCount = show.bookedSeats?.length || 0;
                    const seatsLeft = (show.totalSeats || 60) - bookedCount;
                    const isAlmostFull = seatsLeft <= 10;

                    return (
                      <Link
                        key={show._id}
                        to={`/book/${show._id}`}
                        className="btn btn-outline-light d-flex flex-column align-items-center p-3 rounded-3 text-decoration-none border-secondary text-start"
                        style={{ minWidth: '150px' }}
                      >
                        <span className="fw-bold text-success fs-5 mb-1">{show.showTime}</span>
                        <div className="d-flex align-items-center gap-1 mb-1">
                          <span className="badge bg-secondary small">{show.screenType}</span>
                          <span className="text-secondary small">₹{show.ticketPrice?.regular || 200}</span>
                        </div>
                        <span className={`small ${isAlmostFull ? 'text-danger' : 'text-secondary'}`} style={{ fontSize: '11px' }}>
                          {isAlmostFull ? `Only ${seatsLeft} left!` : 'Available'}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
