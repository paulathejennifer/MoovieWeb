"use client"; 

import { useState, useContext, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import { UserContext } from './context';
import Footer from './components/Footer';


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


interface HomeProps {}


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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching data from /api/movies at', new Date().toISOString());
        const response = await fetch('/api/movies');
        console.log('Fetch response status:', response.status, response.statusText);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', JSON.stringify(data, null, 2));
        setLatestMovies(data.latestMovies);
        setLatestSeries(data.latestSeries);
      } catch (err) {
        console.error('Fetch error in page.tsx:', err);
        setError((err as Error).message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
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
        .catch((err) => setError((err as Error).message || 'Search error'));
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
            <MovieCard key={item.id} item={item} type={item.media_type || 'unknown'} />
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