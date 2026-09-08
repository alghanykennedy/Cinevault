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
import type { SectionState } from "../../types/ui";

const initialMovieState: SectionState<Movie> = {
  data: [],
  loading: true,
  error: null,
};

const initialTVState: SectionState<TVShow> = {
  data: [],
  loading: true,
  error: null,
};

const Home = () => {
  const [trending, setTrending] =
    useState<SectionState<Movie>>(initialMovieState);

  const [popular, setPopular] =
    useState<SectionState<Movie>>(initialMovieState);

  const [topRated, setTopRated] =
    useState<SectionState<Movie>>(initialMovieState);

  const [popularTV, setPopularTV] =
    useState<SectionState<TVShow>>(initialTVState);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const response = await getTrendingMovies();

        setTrending({
          data: response.results,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to load trending movies:", error);

        setTrending({
          data: [],
          loading: false,
          error: "Unable to load trending movies.",
        });
      }
    };

    const loadPopular = async () => {
      try {
        const response = await getPopularMovies();

        setPopular({
          data: response.results,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to load popular movies:", error);

        setPopular({
          data: [],
          loading: false,
          error: "Unable to load popular movies.",
        });
      }
    };

    const loadTopRated = async () => {
      try {
        const response = await getTopRatedMovies();

        setTopRated({
          data: response.results,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to load top rated movies:", error);

        setTopRated({
          data: [],
          loading: false,
          error: "Unable to load top rated movies.",
        });
      }
    };

    const loadPopularTV = async () => {
      try {
        const response = await getPopularTVShows();

        setPopularTV({
          data: response.results,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to load popular TV shows:", error);

        setPopularTV({
          data: [],
          loading: false,
          error: "Unable to load popular TV shows.",
        });
      }
    };

    loadTrending();
    loadPopular();
    loadTopRated();
    loadPopularTV();
  }, []);

  return (
    <>
      <Hero />

      <MediaRow
        title="Trending Now"
        description="Discover what's trending this week."
        media={trending.data.slice(0, 10)}
        loading={trending.loading}
        error={trending.error}
      />

      <MediaRow
        title="Popular Movies"
        description="The movies everyone is watching."
        media={popular.data.slice(0, 10)}
        loading={popular.loading}
        error={popular.error}
      />

      <MediaRow
        title="Top Rated"
        description="Highly rated movies worth watching."
        media={topRated.data.slice(0, 10)}
        loading={topRated.loading}
        error={topRated.error}
      />

      <MediaRow
        title="Popular TV Shows"
        description="Popular shows you don't want to miss."
        media={popularTV.data.slice(0, 10)}
        loading={popularTV.loading}
        error={popularTV.error}
      />
    </>
  );
};

export default Home;
