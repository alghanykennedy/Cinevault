import MediaDetail from "../../components/media/MediaDetail";
import { getMovieDetails } from "../../services/tmdb/movie";

const MovieDetail = () => {
  return <MediaDetail mediaType="movie" getDetails={getMovieDetails} />;
};

export default MovieDetail;
