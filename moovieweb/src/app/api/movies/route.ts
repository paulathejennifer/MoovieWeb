import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('Movies route triggered at', new Date().toISOString());
  console.log('TMDB_READ_TOKEN available:', !!process.env.TMDB_READ_TOKEN);
  console.log('BASE_URL:', process.env.BASE_URL);

  try {
    const today = new Date().toISOString().slice(0, 10);
    const baseUrl = process.env.BASE_URL || 'https://api.themoviedb.org/3';

    if (!process.env.TMDB_READ_TOKEN) {
      throw new Error('TMDB_READ_TOKEN environment variable is not set');
    }

    const moviesRes = await fetch(
      `${baseUrl}/discover/movie?sort_by=release_date.desc&primary_release_date.lte=${today}&with_release_type=2|3`,
      { headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` } }
    );
    console.log('Movies API response status:', moviesRes.status, moviesRes.statusText);
    if (!moviesRes.ok) {
      const errorText = await moviesRes.text();
      throw new Error(`Failed to fetch movies: ${moviesRes.status} - ${errorText}`);
    }
    const moviesData = await moviesRes.json();
    console.log('Movies data received:', JSON.stringify(moviesData, null, 2));

    const seriesRes = await fetch(
      `${baseUrl}/discover/tv?sort_by=first_air_date.desc&first_air_date.lte=${today}`,
      { headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` } }
    );
    console.log('Series API response status:', seriesRes.status, seriesRes.statusText);
    if (!seriesRes.ok) {
      const errorText = await seriesRes.text();
      throw new Error(`Failed to fetch series: ${seriesRes.status} - ${errorText}`);
    }
    const seriesData = await seriesRes.json();
    console.log('Series data received:', JSON.stringify(seriesData, null, 2));

    return NextResponse.json({
      latestMovies: moviesData.results?.slice(0, 10) || [],
      latestSeries: seriesData.results?.slice(0, 10) || [],
    });
  } catch (error) {
    console.error('Error in movies route:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}