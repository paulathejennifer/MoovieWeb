export default async function handler(req, res) {
  const { request_token } = req.query;
  const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.TMDB_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request_token }),
  });
  const data = await response.json();
  res.status(200).json(data);
}