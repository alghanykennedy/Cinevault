import RatingBadge from "./RatingBadge";
import type { Movie } from "../../types/tmdb";

interface MovieCardProps {
  movie: Movie;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <article className="group w-full min-w-0">
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-zinc-900">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900 px-4 text-center">
            <span className="text-sm text-zinc-500">No poster available</span>
          </div>
        )}
        <RatingBadge rating={movie.vote_average} />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="mt-3">
        <h3
          title={movie.title}
          className="truncate text-sm font-semibold text-white">
          {movie.title}
        </h3>

        {releaseYear && (
          <p className="mt-1 text-xs text-zinc-500">{releaseYear}</p>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
