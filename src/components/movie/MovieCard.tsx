import type { Movie } from "../../types/tmdb";
import MediaCard from "../media/MediaCard";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return <MediaCard media={movie} />;
};

export default MovieCard;
