export default function MovieSection({ title, movies, onViewAllClick }) {
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <button 
          className="text-yellow-400 cursor-pointer"
          onClick={onViewAllClick}
        >
          View all &gt;
        </button>
      </div>
      <div className="flex overflow-x-scroll space-x-4 hide-scrollbar">
        {movies.map(movie => (
          <div key={movie.id} className="min-w-[150px] cursor-pointer text-white">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-lg object-cover h-40 w-full"
            />
            <p className="mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
