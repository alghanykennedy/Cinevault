import type { Movie, TVShow } from "../../types/tmdb";
import FeedbackPanel from "../common/FeedbackPanel";
import LoadingSkeleton from "../movie/LoadingSkeleton";
import MediaCard from "./MediaCard";

type Media = Movie | TVShow;

interface MediaRowProps {
  title: string;
  description?: string;
  media: Media[];
  loading?: boolean;
  error?: string | null;
}

const MediaRow = ({
  title,
  description,
  media,
  loading = false,
  error = null,
}: MediaRowProps) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        {description && <p className="mt-2 text-zinc-400">{description}</p>}
      </div>

      {error ? (
        <FeedbackPanel message={error} />
      ) : loading ? (
        <div className="flex gap-4 overflow-hidden">
          <LoadingSkeleton count={6} variant="row" />
        </div>
      ) : media.length === 0 ? (
        <FeedbackPanel message="No content available right now." />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {media.map((item) => (
            <div key={item.id} className="min-w-35 sm:min-w-42.5 md:min-w-47.5">
              <MediaCard media={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MediaRow;
