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


interface HomeProps {
  latestMovies: MediaItem[];
  latestSeries: MediaItem[];
}

interface User {
  sessionId: string | null;
  accountId: number | null;
  favorites: number[];
}

export default function Home({ latestMovies, latestSeries }: HomeProps) {
  const { user } = useContext(UserContext); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results || []));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

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
