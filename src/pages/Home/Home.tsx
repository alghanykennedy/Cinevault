import { useEffect, useState } from "react";
import Hero from "../../components/common/Hero";
import MovieCard from "../../components/movie/MovieCard";
import { getPopularMovies } from "../../services/tmdb/movie";
import type { Movie } from "../../types/tmdb";

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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Trending Now</h2>

        <p className="mt-2 text-zinc-400">Discover what's popular right now.</p>

        {loading ? (
          <p className="mt-8 text-zinc-500">Loading movies...</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
