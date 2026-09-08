import RatingBadge from "../movie/RatingBadge";
import type { Movie, TVShow } from "../../types/tmdb";
import { getTMDBImageUrl } from "../../utils/images";
import { Link } from "react-router-dom";

type Media = Movie | TVShow;

interface MediaCardProps {
  media: Media;
}

const isMovie = (media: Media): media is Movie => {
  return "title" in media;
};

const MediaCard = ({ media }: MediaCardProps) => {
  const title = isMovie(media) ? media.title : media.name;

  const date = isMovie(media) ? media.release_date : media.first_air_date;

  const releaseYear = date ? new Date(date).getFullYear() : null;

  const posterUrl = getTMDBImageUrl(media.poster_path, "w500");

  return (
    <Link to={`/movies/${media.id}`} className="block">
      <article className="group w-full min-w-0">
        <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-zinc-900">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${title} poster`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-900 px-4 text-center">
              <span className="text-sm text-zinc-500">No poster available</span>
            </div>
          )}

          <RatingBadge rating={media.vote_average} />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="mt-3">
          <h3
            title={title}
            className="truncate text-sm font-semibold text-white">
            {title}
          </h3>

          {releaseYear && (
            <p className="mt-1 text-xs text-zinc-500">{releaseYear}</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default MediaCard;
