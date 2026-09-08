import { useEffect, useState } from "react";

import Hero from "../../components/common/Hero";
import MediaRow from "../../components/media/MediaRow";

import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../../services/tmdb/movie";

import { getPopularTVShows } from "../../services/tmdb/tv";

import type { Movie, TVShow } from "../../types/tmdb";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [
          trendingResponse,
          popularResponse,
          topRatedResponse,
          tvResponse,
        ] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularTVShows(),
        ]);

        setTrendingMovies(trendingResponse.results);
        setPopularMovies(popularResponse.results);
        setTopRatedMovies(topRatedResponse.results);
        setPopularTVShows(tvResponse.results);
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <>
      <Hero />

      <MediaRow
        title="Trending Now"
        description="Discover what's trending this week."
        media={trendingMovies.slice(0, 10)}
        loading={loading}
      />

      <MediaRow
        title="Popular Movies"
        description="The movies everyone is watching."
        media={popularMovies.slice(0, 10)}
        loading={loading}
      />

      <MediaRow
        title="Top Rated"
        description="Highly rated movies worth watching."
        media={topRatedMovies.slice(0, 10)}
        loading={loading}
      />

      <MediaRow
        title="Popular TV Shows"
        description="Popular shows you don't want to miss."
        media={popularTVShows.slice(0, 10)}
        loading={loading}
      />
    </>
  );
};

export default Home;
