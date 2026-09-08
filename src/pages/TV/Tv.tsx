import { useEffect, useRef, useState } from "react";

import FeedbackPanel from "../../components/common/FeedbackPanel";
import LoadingSkeleton from "../../components/movie/LoadingSkeleton";
import MediaGrid from "../../components/media/MediaGrid";
import { getPopularTVShows, getTopRatedTVShows } from "../../services/tmdb/tv";
import type { TVShow } from "../../types/tmdb";

type TVCategory = "popular" | "top-rated";

const TV = () => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [category, setCategory] = useState<TVCategory>("popular");
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(0);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const requestIdRef = useRef(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    pageRef.current = 0;
    isLoadingRef.current = false;
    hasMoreRef.current = true;

    const loadPage = async (page: number) => {
      if (
        isLoadingRef.current ||
        !hasMoreRef.current ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      isLoadingRef.current = true;
      setLoading(true);

      try {
        const response =
          category === "top-rated"
            ? await getTopRatedTVShows(page)
            : await getPopularTVShows(page);

        if (requestId !== requestIdRef.current) return;

        const totalPages = Math.min(response.total_pages, 500);
        setShows((currentShows) => {
          const existingIds = new Set(currentShows.map((show) => show.id));
          const newShows = response.results.filter(
            (show) => !existingIds.has(show.id),
          );

          return page === 1 ? response.results : [...currentShows, ...newShows];
        });
        pageRef.current = page;
        hasMoreRef.current = page < totalPages && response.results.length > 0;
        setHasMore(hasMoreRef.current);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        console.error("Failed to load TV shows:", error);
        setError("Unable to load TV shows right now.");
      } finally {
        if (requestId === requestIdRef.current) {
          isLoadingRef.current = false;
          setLoading(false);
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadPage(pageRef.current + 1);
        }
      },
      { rootMargin: "400px 0px" },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    void loadPage(1);

    return () => {
      observer.disconnect();
      requestIdRef.current += 1;
    };
  }, [category]);

  const handleCategoryChange = (nextCategory: TVCategory) => {
    if (nextCategory === category) return;

    setShows([]);
    setHasMore(true);
    setError(null);
    setLoading(true);
    setCategory(nextCategory);
  };

  return (
    <main className="min-h-screen bg-(--color-background) pt-24 text-(--color-text-primary)">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold md:text-4xl">TV Shows</h1>
          <p className="mt-2 text-(--color-text-secondary)">
            Discover shows worth watching.
          </p>
        </div>

        <div className="mb-10 flex gap-2 overflow-x-auto">
          {[
            ["popular", "Popular"],
            ["top-rated", "Top Rated"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => handleCategoryChange(value as TVCategory)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                category === value
                  ? "bg-(--color-accent) text-white"
                  : "bg-(--color-surface) text-(--color-text-secondary) hover:bg-(--color-surface-elevated) hover:text-white"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {error && shows.length === 0 ? (
          <FeedbackPanel message={error} />
        ) : (
          <>
            <MediaGrid media={shows} loading={loading && shows.length === 0} />

            {error && <FeedbackPanel message={error} />}

            <div ref={loadMoreRef} className="mt-10 min-h-24">
              {loading && shows.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  <LoadingSkeleton count={6} />
                </div>
              )}

              {!loading && !hasMore && shows.length > 0 && (
                <p className="text-center text-sm text-(--color-text-muted)">
                  You&apos;ve reached the end of the list.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default TV;
