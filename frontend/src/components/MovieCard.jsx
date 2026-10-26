import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="imovies-card h-100 d-flex flex-column p-3 text-start">
        {/* Poster Wrapper */}
        <div className="movie-poster-wrapper mb-3 position-relative">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
            }}
          />
          {movie.rating > 0 && (
            <div className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark fw-bold d-flex align-items-center gap-1 shadow-sm px-2 py-1">
              <i className="bi bi-star-fill text-dark"></i>
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}
          <div className="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75 text-white small">
            {movie.language || 'English'}
          </div>
        </div>

        {/* Content */}
        <h5 className="text-white fw-bold text-truncate mb-1" title={movie.title}>
          {movie.title}
        </h5>

        <div className="d-flex flex-wrap gap-1 mb-2">
          {movie.genre?.slice(0, 2).map((g, idx) => (
            <span key={idx} className="badge bg-secondary bg-opacity-25 text-light small fw-normal">
              {g}
            </span>
          ))}
          {movie.duration && (
            <span className="badge bg-secondary bg-opacity-25 text-secondary small fw-normal ms-auto">
              <i className="bi bi-clock me-1"></i>
              {movie.duration}m
            </span>
          )}
        </div>

        <p className="text-secondary small mb-3 flex-grow-1" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {movie.description}
        </p>

        {/* Action Button */}
        <Link
          to={`/movie/${movie._id}`}
          className="btn btn-danger w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-auto"
        >
          <i className="bi bi-ticket-perforated"></i>
          <span>Book Tickets</span>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
