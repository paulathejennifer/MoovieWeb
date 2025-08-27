'use client';
import { useContext, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function MovieCard({ item, type }) {
  const { user, setUser } = useContext(UserContext);
  const isFavorite = user.favorites?.includes(item.id);
  const [favorited, setFavorited] = useState(isFavorite);

  const toggleFavorite = async () => {
    if (!user.sessionId) return alert('Please sign in.');
    const res = await fetch('/api/toggle-favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: user.accountId, sessionId: user.sessionId, mediaType: type, mediaId: item.id, favorite: !favorited }),
    });
    if (res.ok) {
      setFavorited(!favorited);
      setUser((prev) => ({
        ...prev,
        favorites: !favorited ? [...prev.favorites, item.id] : prev.favorites.filter((id) => id !== item.id),
      }));
    }
  };

  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} alt={item.title || item.name} />
      <h3>{item.title || item.name}</h3>
      {user.sessionId && (
        <button onClick={toggleFavorite}>
          {favorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      )}
    </div>
  );
}