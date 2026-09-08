import { useEffect, useState, useRef } from "react";
import { Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/tmdb";
import { getTMDBImageUrl } from "../../utils/images";
import { getGenreNames } from "../../utils/genres";

interface HeroProps {
  movies?: Movie[];
  loading?: boolean;
  error?: string | null;
}

const Hero = ({ movies = [], loading = false, error = null }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heroMovies = movies.filter((m) => m.backdrop_path).slice(0, 10);
  const safeIndex = Math.min(currentIndex, Math.max(heroMovies.length - 1, 0));
  const currentMovie = heroMovies[safeIndex] || heroMovies[0];

  useEffect(() => {
    if (isPaused || heroMovies.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, heroMovies.length]);

  if (loading) {
    return (
      <div className="relative h-[80vh] min-h-137.5 max-h-187.5 w-full bg-zinc-900 animate-pulse flex items-end p-8 sm:p-16">
        <div className="max-w-xl space-y-4 w-full">
          <div className="h-6 w-20 bg-zinc-800 rounded"></div>
          <div className="h-12 w-3/4 bg-zinc-800 rounded"></div>
          <div className="h-4 w-1/2 bg-zinc-800 rounded"></div>
          <div className="h-20 w-full bg-zinc-800 rounded"></div>
          <div className="h-12 w-36 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !currentMovie) {
    return (
      <section className="relative h-[60vh] min-h-112.5 w-full bg-zinc-950 flex items-center justify-center text-center p-6 pt-24">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Unable to load featured movies
          </h2>
          <p className="text-zinc-400 text-sm max-w-md">
            {error || "Please check your network connection and try again."}
          </p>
        </div>
      </section>
    );
  }

  const releaseYear = currentMovie.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : "2025";
  const genres = getGenreNames(currentMovie.genre_ids);
  const rating = currentMovie.vote_average
    ? currentMovie.vote_average.toFixed(1)
    : "0.0";
  const backdropUrl = getTMDBImageUrl(currentMovie.backdrop_path, "original");

  return (
    <section
      className="relative h-[85vh] min-h-145 max-h-212.5 w-full overflow-hidden select-none bg-[#08090B]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {backdropUrl && (
          <img
            key={currentMovie.id}
            src={backdropUrl}
            alt={currentMovie.title}
            className="h-full w-full object-cover object-center animate-fade-in"
          />
        )}
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-36 bg-linear-to-b from-(--color-background)/70 via-(--color-background)/30 to-transparent" />

      <div className="absolute inset-0 z-10 bg-linear-to-r from-(--color-background)/70 via-(--color-background)/40 via-45% to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 h-48 bg-linear-to-t from-(--color-background)/90 via-(--color-background)/40 to-transparent" />

      {/* Hero Content Container */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-2xl pb-6 sm:pb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-(--color-accent) px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
              MOVIE
            </span>
            <span className="text-xs sm:text-sm font-medium italic text-zinc-300/90 tracking-wide">
              Now Playing in Theaters
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl line-clamp-2 leading-tight">
            {currentMovie.title}
          </h1>

          <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-zinc-300">
            <span className="flex items-center gap-1 font-bold text-yellow-400">
              <Star size={16} fill="currentColor" className="text-yellow-400" />
              {rating}
            </span>

            <span className="text-zinc-500">•</span>
            <span>{releaseYear}</span>

            {genres && (
              <>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-300">{genres}</span>
              </>
            )}
          </div>

          {/* Overview */}
          <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300/90 line-clamp-3 sm:line-clamp-4 max-w-xl">
            {currentMovie.overview || "No overview available for this movie."}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <Link
              to={`/movies/${currentMovie.id}`}
              className="inline-flex items-center gap-2.5 rounded-lg bg-(--color-accent) px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-600/30">
              <Play size={18} fill="currentColor" />
              Watch Now
            </Link>
          </div>

          {/* Slider Pagination Controls (Dots & Progress Bar) */}
          {heroMovies.length > 1 && (
            <div className="mt-8 flex items-center gap-2">
              {heroMovies.map((m, idx) => {
                const isActive = idx === safeIndex;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                      isActive
                        ? "w-8 bg-(--color-accent) shadow-md shadow-red-600/40"
                        : "w-2.5 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
