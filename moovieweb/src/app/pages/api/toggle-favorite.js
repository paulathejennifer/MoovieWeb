export default async function handler(req, res) {
  const { accountId, sessionId, mediaType, mediaId, favorite } = req.body;
  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: mediaType, media_id: mediaId, favorite }),
  });
  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
}