import { useState, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import { UserContext } from './_app';

export default function Home({ latestMovies, latestSeries }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(UserContext);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      const res = await fetch(`/api/search?query=${encodeURIComponent(e.target.value)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="container">
      <h1>Movie App</h1>
      {!user.sessionId && <a href="/login">Sign In</a>}
      {user.sessionId && <a href="/favorites">Favorites</a>}
      <input type="text" placeholder="Search movies or series..." value={searchQuery} onChange={handleSearch} />
      {searchResults.length > 0 && (
        <div className="grid">
          {searchResults.map((item) => <MovieCard key={item.id} item={item} type={item.media_type} />)}
        </div>
      )}
      <h2>Latest Movies</h2>
      <div className="grid">
        {latestMovies.map((movie) => <MovieCard key={movie.id} item={movie} type="movie" />)}
      </div>
      <h2>Latest Series</h2>
      <div className="grid">
        {latestSeries.map((series) => <MovieCard key={series.id} item={series} type="tv" />)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const today = new Date().toISOString().slice(0, 10);

  const moviesRes = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&primary_release_date.lte=${today}&with_release_type=2|3`, {
    headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` },
  });
  const moviesData = await moviesRes.json();

  const seriesRes = await fetch(`https://api.themoviedb.org/3/discover/tv?sort_by=first_air_date.desc&first_air_date.lte=${today}`, {
    headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` },
  });
  const seriesData = await seriesRes.json();

  return {
    props: {
      latestMovies: moviesData.results.slice(0, 10),
      latestSeries: seriesData.results.slice(0, 10),
    },
  };
}