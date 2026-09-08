import { useEffect, useState } from "react";
import { ArrowLeft, Play, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import MovieGrid from "../../components/movie/MovieGrid";
import { getMovieDetails } from "../../services/tmdb/movie";
import type { MovieDetails } from "../../types/tmdb";
import { getTMDBImageUrl } from "../../utils/images";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const movieId = id ? Number(id) : null;
  const routeError = !id
    ? "Movie not found."
    : !Number.isInteger(movieId)
      ? "Invalid movie ID."
      : null;

  useEffect(() => {
    if (routeError || movieId === null) {
      return;
    }

    const loadMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        console.error("Failed to load movie:", error);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [movieId, routeError]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#08090b] px-4 pt-28 text-white">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-125 rounded-2xl bg-zinc-900" />
        </div>
      </main>
    );
  }

  if (routeError || error || !movie) {
    return (
      <main className="min-h-screen bg-[#08090b] px-4 pt-28 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={16} />
            Back to movies
          </Link>

          <div className="mt-8 rounded-xl border border-white/10 bg-zinc-900/60 p-8">
            <p className="text-zinc-400">
              {routeError ?? error ?? "Movie not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const backdropUrl = getTMDBImageUrl(movie.backdrop_path, "original");

  const posterUrl = getTMDBImageUrl(movie.poster_path, "w500");

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const trailer = movie.videos?.results.find(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer" && video.official,
  );

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <section className="relative min-h-162.5 overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-linear-to-t from-[#08090b] via-[#08090b]/70 to-transparent" />

        <div className="relative mx-auto flex min-h-162.5 max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
            <div className="hidden md:block">
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  className="w-full rounded-2xl shadow-2xl"
                />
              )}
            </div>

            <div className="max-w-3xl">
              <Link
                to="/movies"
                className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white">
                <ArrowLeft size={16} />
                Back to movies
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                {releaseYear && <span>{releaseYear}</span>}

                {movie.runtime && (
                  <>
                    <span>•</span>
                    <span>{movie.runtime} min</span>
                  </>
                )}

                <span>•</span>

                <div className="flex items-center gap-1 text-white">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-4 text-lg italic text-zinc-300">
                  {movie.tagline}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
                {movie.overview || "No overview available."}
              </p>

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                  <Play size={16} fill="currentColor" />
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Cast</h2>

          <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
            {movie.credits.cast.slice(0, 10).map((person) => {
              const profileUrl = getTMDBImageUrl(person.profile_path, "w185");

              return (
                <div key={person.id} className="w-32 shrink-0">
                  <div className="aspect-2/3 overflow-hidden rounded-xl bg-zinc-900">
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt={person.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-3 text-center text-xs text-zinc-600">
                        No image
                      </div>
                    )}
                  </div>

                  <p className="mt-3 truncate text-sm font-medium">
                    {person.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {person.character}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {movie.similar?.results && movie.similar.results.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">You May Also Like</h2>

          <div className="mt-6">
            <MovieGrid movies={movie.similar.results.slice(0, 12)} />
          </div>
        </section>
      )}
    </main>
  );
};

export default MovieDetail;
