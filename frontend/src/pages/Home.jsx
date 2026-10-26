import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import MovieCard from '../components/MovieCard';

const GENRES = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Animation', 'Biography'];

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (selectedGenre !== 'All') params.genre = selectedGenre;
      const res = await api.get('/movies', { params });
      setMovies(res.data.movies || []);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Unable to load movies right now. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const heroMovie = movies[0];

  return (
    <div>
      {/* Hero Spotlight Section */}
      {heroMovie && (
        <div
          className="position-relative text-white py-5 px-3 mb-5 d-flex align-items-center"
          style={{
            minHeight: '440px',
            background: `linear-gradient(to right, rgba(15,16,22,0.95) 30%, rgba(15,16,22,0.6) 70%, rgba(15,16,22,0.3) 100%), url(${heroMovie.bannerUrl || heroMovie.posterUrl}) center/cover no-repeat`,
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <span className="badge bg-danger mb-2 px-3 py-2 text-uppercase fw-bold">
                  <i className="bi bi-fire me-1"></i> Featured Premiere
                </span>
                <h1 className="display-4 fw-black text-white mb-2">{heroMovie.title}</h1>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                    <i className="bi bi-star-fill me-1"></i> {heroMovie.rating}
                  </span>
                  <span className="text-light small">{heroMovie.duration} mins</span>
                  <span className="text-secondary small">•</span>
                  <span className="text-light small">{heroMovie.genre?.join(', ')}</span>
                </div>
                <p className="lead text-light opacity-75 mb-4" style={{ maxWidth: '600px' }}>
                  {heroMovie.description}
                </p>
                <div className="d-flex gap-3">
                  <Link
                    to={`/movie/${heroMovie._id}`}
                    className="btn btn-danger btn-lg fw-bold px-4 py-2 d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-ticket-perforated-fill fs-5"></i>
                    <span>Book Tickets</span>
                  </Link>
                  {heroMovie.trailerUrl && (
                    <a
                      href={heroMovie.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light btn-lg px-4 py-2 d-flex align-items-center gap-2"
                    >
                      <i className="bi bi-play-circle fs-5"></i>
                      <span>Watch Trailer</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Catalog Container */}
      <div className="container pb-5">
        {/* Search & Category Filter Bar */}
        <div className="row g-3 align-items-center justify-content-between mb-4">
          <div className="col-lg-6 col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark border-secondary text-white py-2"
                placeholder="Search movies by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-dark border-secondary text-secondary"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="d-flex gap-2 overflow-auto pb-2 scroll-nowrap">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  className={`btn btn-sm text-nowrap rounded-pill px-3 py-2 fw-semibold ${
                    selectedGenre === genre
                      ? 'btn-danger'
                      : 'btn-outline-secondary text-light'
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold text-white mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-camera-reels text-danger"></i>
            <span>Now Showing in Theatres</span>
          </h3>
          <span className="text-secondary small">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'} Available
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-warning d-flex align-items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill fs-4"></i>
            <div>{error}</div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3">Loading available movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-5 bg-dark bg-opacity-50 rounded-4 border border-secondary border-opacity-25">
            <i className="bi bi-film display-4 text-secondary mb-3 d-block"></i>
            <h5 className="text-white">No movies found</h5>
            <p className="text-secondary small">Try adjusting your search query or genre filter.</p>
            <button
              className="btn btn-outline-danger mt-2"
              onClick={() => {
                setSelectedGenre('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
