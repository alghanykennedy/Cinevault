import type { Movie, TVShow } from "../../types/tmdb";
import LoadingSkeleton from "../movie/LoadingSkeleton";
import MediaCard from "./MediaCard";

type Media = Movie | TVShow;

interface MediaGridProps {
  media: Media[];
  loading?: boolean;
}

const MediaGrid = ({ media, loading = false }: MediaGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {loading ? (
        <LoadingSkeleton count={12} />
      ) : (
        media.map((item) => <MediaCard key={item.id} media={item} />)
      )}
    </div>
  );
};

export default MediaGrid;
