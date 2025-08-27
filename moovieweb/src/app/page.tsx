"use client"; // Mark as Client Component

import { useState, useContext, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { UserContext } from './context';
import Footer from '../components/Footer';

// Define the shape of a movie/series item from TMDB API
interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
}

// Define the props shape for the Home component (no props needed now since fetching in client)
interface HomeProps {}

// Define the shape of the user object in UserContext
interface User {
  sessionId: string | null;
  accountId: number | null;
  favorites: number[];
}

export default function Home() {
  const { user } = useContext(UserContext);
  const [latestMovies, setLatestMovies] = useState<MediaItem[]>([]);
  const [latestSeries, setLatestSeries] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const today = new Date().toISOString().slice(0, 10);

        const moviesRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&primary_release_date.lte=${today}&with_release_type=2|3`,
          { headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` } }
        );
        if (!moviesRes.ok) throw new Error('Failed to fetch movies');
        const moviesData = await moviesRes.json();
        setLatestMovies(moviesData.results?.slice(0, 10) || []);

        const seriesRes = await fetch(
          `https://api.themoviedb.org/3/discover/tv?sort_by=first_air_date.desc&first_air_date.lte=${today}`,
          { headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` } }
        );
        if (!seriesRes.ok) throw new Error('Failed to fetch series');
        const seriesData = await seriesRes.json();
        setLatestSeries(seriesData.results?.slice(0, 10) || []);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Search failed');
          return res.json();
        })
        .then((data) => setSearchResults(data.results || []))
        .catch((err) => setError(err.message || 'Search error'));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Movie App</h1>
      {!user.sessionId && <a href="/login">Sign In</a>}
      {user.sessionId && <a href="/favorites">Favorites</a>}
      <input type="text" placeholder="Search movies or series..." value={searchQuery} onChange={handleSearch} />
      {searchResults.length > 0 && (
        <div className="grid">
          {searchResults.map((item) => (
            <MovieCard key={item.id} item={item} type={item.media_type} />
          ))}
        </div>
      )}
      <h2>Latest Movies</h2>
      <div className="grid">
        {latestMovies.map((movie) => (
          <MovieCard key={movie.id} item={movie} type="movie" />
        ))}
      </div>
      <h2>Latest Series</h2>
      <div className="grid">
        {latestSeries.map((series) => (
          <MovieCard key={series.id} item={series} type="tv" />
        ))}
      </div>
      <Footer onViewAllClick={() => alert("View all last additions")} />
    </div>
  );
}