import { useEffect, useState } from "react";

import Hero from "../../components/common/Hero";
import { getPopularMovies } from "../../services/tmdb/movie";
import type { Movie } from "../../types/tmdb";

import MovieRow from "../../components/movie/MovieRow";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await getPopularMovies();

        setMovies(response.results);
      } catch (error) {
        console.error("TMDB API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <>
      <Hero />

      <MovieRow
        title="Trending Now"
        description="Discover what's popular right now."
        movies={movies.slice(0, 12)}
        loading={loading}
      />
    </>
  );
};

export default Home;
