import { useEffect } from "react";
import { getPopularMovies } from "./services/tmdb/movie";

function App() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await getPopularMovies();

        console.log(response);
      } catch (error) {
        console.error("TMDB API Error:", error);
      }
    };

    testApi();
  }, []);

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <h1 className="p-10 text-3xl font-bold">CineVault</h1>
    </main>
  );
}

export default App;
