import { useState, useEffect } from "react";
import { Search, User, Home as HomeIcon, Film, Tv, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      label: "Movies",
      path: "/movies",
      icon: Film,
    },
    {
      label: "TV Series",
      path: "/tv-shows",
      icon: Tv,
    },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090B]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-gradient-to-b from-[#08090B]/85 via-[#08090B]/40 to-transparent"
      }`}>
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation">
        {/* Logo */}
        <NavLink
          to="/"
          className="shrink-0 text-xl sm:text-2xl font-black tracking-wider transition hover:opacity-90 flex items-center gap-1"
          aria-label="CineVault home">
          <span className="text-[#E50914] font-black">CINE</span>
          <span className="text-white font-extrabold">VAULT</span>
        </NavLink>

        {/* Desktop Nav Items */}
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all px-3.5 py-1.5 rounded-full flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#E50914]/25 text-white border border-[#E50914]/40 shadow-sm"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}>
                <Icon size={16} className={isActive ? "text-[#E50914]" : "text-zinc-400"} />
                {item.label}
              </NavLink>
            );
          })}

          {/* More Dropdown Button */}
          <div className="relative group">
            <button
              type="button"
              className="text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1 transition">
              <span>More</span>
              <ChevronDown size={14} className="text-zinc-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Right Section: Search & Account */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/search"
            aria-label="Search movies and TV shows"
            className="rounded-full p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white">
            <Search size={20} />
          </NavLink>

          <button
            type="button"
            aria-label="Open profile"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 border border-white/10">
            <User size={16} className="text-zinc-300" />
            <span className="hidden sm:inline">Account</span>
            <ChevronDown size={12} className="text-zinc-400" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
