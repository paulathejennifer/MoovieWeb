import React from 'react';

interface MovieCardProps {
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
  };
  type: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, type }) => {
  const title = item.title || item.name || 'Untitled';
  const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : '/placeholder.jpg';

  return (
    <div className="card">
      <img src={posterUrl} alt={`${title} poster`} />
      <h3>{title}</h3>
      <p>Type: {type}</p>
    </div>
  );
};

export default MovieCard;