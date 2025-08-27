
import React from "react";

const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vloNTScJ3w7jwNwtNGoG8DbTThv.jpg"
export default function HeroBanner({ movie, onAddToFavorites, onWatchNow }) {
  if (!movie) return null;

  return (
    <section className="relative w-full h-[36rem] md:h-[42rem] lg:h-[48rem]">

      <img
        src={IMAGE_BASE_URL + movie.backdrop_path}
        alt={movie.title}
        className="w-full h-full object-cover brightness-75"
      />

      <div className="absolute top-10 left-10 max-w-lg text-white">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {movie.title}{" "}
          <span className="text-yellow-400">{movie.subtitle || ""}</span>
        </h1>

        <div className="mt-1 text-sm text-gray-200 flex items-center space-x-3">
          {movie.adult && (
            <span className="border border-gray-400 rounded px-1 text-xs">
              16+
            </span>
          )}
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>· {new Date(movie.release_date).getFullYear()}</span>
          {movie.seasons && (
            <span>
              · Season {movie.seasons.length} | {movie.number_of_episodes} Episodes
            </span>
          )}
        </div>


        <p className="mt-4 text-sm max-w-md line-clamp-4">{movie.overview}</p>


        {movie.credits?.cast?.length > 0 && (
          <p className="mt-3 text-xs text-gray-300 max-w-md">
            Starring:{" "}
            {movie.credits.cast
              .slice(0, 3)
              .map((c) => c.name)
              .join(", ")}
            {movie.credits.cast.length > 3 && ", ..."}
          </p>
        )}

        <div className="mt-6 flex space-x-4">
          <button
            onClick={onWatchNow}
            className="bg-yellow-400 rounded-md px-6 py-2 font-semibold hover:bg-yellow-500 transition"
          >
            Watch Now
          </button>
          <button
            onClick={onAddToFavorites}
            className="bg-transparent border border-yellow-400 rounded-md px-6 py-2 font-semibold hover:bg-yellow-400 hover:text-black transition"
          >
            Add To Favourites
          </button>
        </div>
      </div>
    </section>
  );
}
