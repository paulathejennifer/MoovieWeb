export default async function handler(req, res) {
  const { query } = req.query;
  const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}`, {
    headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` },
  });
  const data = await response.json();
  res.status(200).json(data);
}