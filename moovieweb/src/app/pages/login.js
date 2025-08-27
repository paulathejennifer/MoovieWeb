export default function Login() {
  const handleSignIn = async () => {
    const res = await fetch('/api/request-token');
    const { request_token } = await res.json();
    if (request_token) {
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent('http://localhost:3000/callback')}`;
    }
  };

  return (
    <div>
      <h1>Sign In to TMDB</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}