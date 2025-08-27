import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { UserContext } from './_app';

export default function Favorites() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user.sessionId && user.accountId) {
      fetch(`/api/favorites?accountId=${user.accountId}&sessionId=${user.sessionId}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data.movies.concat(data.tv)));
    }
  }, [user]);

  if (!user.sessionId) return <div>Please sign in.</div>;

  return (
    <div>
      <h1>My Favorites</h1>
      <div className="grid">
        {favorites.map((item) => <MovieCard key={item.id} item={item} type={item.media_type || 'movie'} />)}
      </div>
    </div>
  );
}