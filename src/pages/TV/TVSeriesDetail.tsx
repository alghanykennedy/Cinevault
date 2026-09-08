import MediaDetail from "../../components/media/MediaDetail";
import { getTVDetails } from "../../services/tmdb/tv";

const TVSeriesDetail = () => {
  return <MediaDetail mediaType="tv" getDetails={getTVDetails} />;
};

export default TVSeriesDetail;
