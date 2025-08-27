export default async function handler(req, res) {
  const { accountId, sessionId } = req.query;
  const moviesRes = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionId}`);
  const tvRes = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionId}`);
  const movies = await moviesRes.json();
  const tv = await tvRes.json();
  res.status(200).json({ movies: movies.results, tv: tv.results });
}