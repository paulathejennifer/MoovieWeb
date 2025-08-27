"use client";

export default function TestEnv() {
  return <div>TMDB_TOKEN: {process.env.TMDB_READ_TOKEN || 'Not set'}</div>;
}