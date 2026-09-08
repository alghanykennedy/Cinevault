import { useEffect, useState } from "react";
import { ArrowLeft, Play, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import FeedbackPanel from "../common/FeedbackPanel";
import MediaGrid from "./MediaGrid";
import type { MovieDetails, TVDetails } from "../../types/tmdb";
import { getTMDBImageUrl } from "../../utils/images";

type MediaDetails = MovieDetails | TVDetails;
type MediaType = "movie" | "tv";

interface MediaDetailProps {
  mediaType: MediaType;
  getDetails: (id: number) => Promise<MediaDetails>;
}

const isMovieDetails = (media: MediaDetails): media is MovieDetails => {
  return "title" in media;
};

const MediaDetail = ({ mediaType, getDetails }: MediaDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mediaId = id ? Number(id) : null;
  const label = mediaType === "movie" ? "movie" : "TV show";
  const collectionPath = mediaType === "movie" ? "/movies" : "/tv-shows";
  const routeError = !id
    ? `${label[0].toUpperCase()}${label.slice(1)} not found.`
    : !Number.isInteger(mediaId)
      ? `Invalid ${label} ID.`
      : null;

  useEffect(() => {
    if (routeError || mediaId === null) {
      return;
    }

    let isCurrent = true;

    const loadDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getDetails(mediaId);
        if (isCurrent) setMedia(response);
      } catch (requestError) {
        if (!isCurrent) return;

        console.error(`Failed to load ${label} details:`, requestError);
        setError(`Unable to load ${label} details.`);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    void loadDetails();

    return () => {
      isCurrent = false;
    };
  }, [getDetails, label, mediaId, routeError]);

  if (loading && !routeError) {
    return (
      <main className="min-h-screen bg-(--color-background) px-4 pt-28 text-white">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-125 rounded-2xl bg-(--color-surface)" />
        </div>
      </main>
    );
  }

  if (routeError || error || !media) {
    return (
      <main className="min-h-screen bg-(--color-background) px-4 pt-28 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            to={collectionPath}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={16} />
            Back to {mediaType === "movie" ? "movies" : "TV shows"}
          </Link>

          <div className="mt-8">
            <FeedbackPanel
              message={routeError ?? error ?? `${label} not found.`}
            />
          </div>
        </div>
      </main>
    );
  }

  const title = isMovieDetails(media) ? media.title : media.name;
  const releaseDate = isMovieDetails(media)
    ? media.release_date
    : media.first_air_date;
  const runtime = isMovieDetails(media)
    ? media.runtime
    : (media.episode_run_time[0] ?? null);
  const backdropUrl = getTMDBImageUrl(media.backdrop_path, "original");
  const posterUrl = getTMDBImageUrl(media.poster_path, "w500");
  const trailer = media.videos?.results.find(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer" && video.official,
  );

  return (
    <main className="min-h-screen bg-(--color-background) text-white">
      <section className="relative min-h-162.5 overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-(--color-background) via-(--color-background)/70 to-transparent" />

        <div className="relative mx-auto flex min-h-162.5 max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
            <div className="hidden md:block">
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt={`${title} poster`}
                  className="w-full rounded-2xl shadow-2xl"
                />
              )}
            </div>

            <div className="max-w-3xl">
              <Link
                to={collectionPath}
                className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white">
                <ArrowLeft size={16} />
                Back to {mediaType === "movie" ? "movies" : "TV shows"}
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                {releaseDate && (
                  <span>{new Date(releaseDate).getFullYear()}</span>
                )}

                {runtime && (
                  <>
                    <span>•</span>
                    <span>
                      {runtime} min{mediaType === "tv" ? "/episode" : ""}
                    </span>
                  </>
                )}

                <span>•</span>
                <div className="flex items-center gap-1 text-white">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  {media.vote_average.toFixed(1)}
                </div>
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {title}
              </h1>

              {media.tagline && (
                <p className="mt-4 text-lg italic text-zinc-300">
                  {media.tagline}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {media.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
                {media.overview || "No overview available."}
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

      {media.credits?.cast && media.credits.cast.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Cast</h2>

          <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
            {media.credits.cast.slice(0, 10).map((person) => {
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

      {media.similar?.results && media.similar.results.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
          <div className="mt-6">
            <MediaGrid media={media.similar.results.slice(0, 12)} />
          </div>
        </section>
      )}
    </main>
  );
};

export default MediaDetail;
