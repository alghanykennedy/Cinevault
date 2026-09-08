import { Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Movies",
      path: "/movies",
    },
    {
      label: "TV Shows",
      path: "/tv-shows",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#08090B]/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation">
        <NavLink
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight"
          aria-label="CineVault home">
          CINE<span className="text-[#E50914]">VAULT</span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`
              }>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/search"
            aria-label="Search movies and TV shows"
            className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white">
            <Search size={20} />
          </NavLink>

          <button
            type="button"
            aria-label="Open profile"
            className="hidden rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white sm:block">
            <User size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
