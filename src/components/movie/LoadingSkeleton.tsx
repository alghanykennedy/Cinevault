interface LoadingSkeletonProps {
  count?: number;
  variant?: "grid" | "row";
}

const LoadingSkeleton = ({
  count = 6,
  variant = "grid",
}: LoadingSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={
            variant === "row" ? "min-w-35 sm:min-w-42.5 md:min-w-47.5" : ""
          }>
          <div className="animate-pulse">
            <div className="aspect-2/3 rounded-xl bg-(--color-surface-elevated)" />

            <div className="mt-3 h-4 w-3/4 rounded bg-(--color-surface-elevated)" />

            <div className="mt-2 h-3 w-1/3 rounded bg-(--color-surface-elevated)" />
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
