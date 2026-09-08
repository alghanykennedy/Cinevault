import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home/Home";

const Movies = () => {
  return (
    <section className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Movies</h1>
    </section>
  );
};

const TVShows = () => {
  return (
    <section className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">TV Shows</h1>
    </section>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
