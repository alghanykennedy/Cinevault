import { Play, Plus } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-137 sm:min-h-150 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg)",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#08090B] via-[#08090B]/80 to-transparent" />

      <div className="absolute inset-0 bg-linear-to-t from-[#08090B] via-transparent to-[#08090B]/30" />

      <div className="relative mx-auto flex min-h-137 sm:min-h-150 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pt-16">
          <div className="mb-4 flex items-center gap-3 text-sm text-zinc-300">
            <span className="rounded bg-[#E50914] px-2 py-1 font-semibold text-white">
              FEATURED
            </span>

            <span>2024</span>

            <span>•</span>

            <span>Action</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
            Dune: Part Two
          </h1>

          <div className="mt-5 flex items-center gap-4 text-sm">
            <span className="font-semibold text-yellow-400">★ 8.7</span>

            <span className="text-zinc-400">2h 46m</span>

            <span className="rounded border border-white/20 px-2 py-0.5 text-zinc-300">
              PG-13
            </span>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
            Follow the mythic journey of Paul Atreides as he unites with Chani
            and the Fremen while seeking revenge against the conspirators who
            destroyed his family.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
              <Play size={18} fill="currentColor" />
              Watch Now
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <Plus size={18} />
              Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
