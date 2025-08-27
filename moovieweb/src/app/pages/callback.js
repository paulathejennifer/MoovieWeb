import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from './_app';

export default function Callback() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const { request_token } = router.query;
    if (request_token) {
      fetch(`/api/create-session?request_token=${request_token}`)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.session_id) {
            const accountRes = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${data.session_id}`);
            const accountData = await accountRes.json();
            const accountId = accountData.id;


            const favRes = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${process.env.TMDB_API_KEY}&session_id=${data.session_id}`);
            const favData = await favRes.json();

            setUser({ sessionId: data.session_id, accountId, favorites: favData.results.map((f) => f.id) });
            router.push('/');
          }
        });
    }
  }, [router.query]);

  return <div>Loading...</div>;
}