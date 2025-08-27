// 'use client';

// import { useState, useContext, useEffect } from 'react';
// import MovieCard from './components/MovieCard';
// import { UserContext } from './context';
// import Footer from './components/Footer';

// export default function ClientHome({ latestMovies, latestSeries }) {
//   const { user } = useContext(UserContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (searchQuery.length > 2) {
//       fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
//         .then((res) => res.json())
//         .then((data) => setSearchResults(data.results || []));
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchQuery]);

//   const handleSearch = (e) => setSearchQuery(e.target.value);

//   return (
//     <div className="container">
//       <h1>Movie App</h1>
//       {!user.sessionId && <a href="/login">Sign In</a>}
//       {user.sessionId && <a href="/favorites">Favorites</a>}
//       <input type="text" placeholder="Search movies or series..." value={searchQuery} onChange={handleSearch} />
//       {searchResults.length > 0 ? (
//         <div className="grid">
//           {searchResults.map((item) => (
//             <MovieCard key={item.id} item={item} type={item.media_type} />
//           ))}
//         </div>
//       ) : (
//         <>
//           <h2>Latest Movies</h2>
//           <div className="grid">
//             {latestMovies.map((movie) => (
//               <MovieCard key={movie.id} item={movie} type="movie" />
//             ))}
//           </div>
//           <h2>Latest Series</h2>
//           <div className="grid">
//             {latestSeries.map((series) => (
//               <MovieCard key={series.id} item={series} type="tv" />
//             ))}
//           </div>
//         </>
//       )}
//       <Footer onViewAllClick={() => alert('View all last additions')} />
//     </div>
//   );
// }
