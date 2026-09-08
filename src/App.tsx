import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Search from "./pages/Search/Search";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import TV from "./pages/TV/Tv";
import TVSeriesDetail from "./pages/TV/TVSeriesDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tv-shows" element={<TV />} />
          <Route path="/tv-shows/:id" element={<TVSeriesDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
