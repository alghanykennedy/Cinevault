import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
}

const RatingBadge = ({ rating }: RatingBadgeProps) => {
  return (
    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
      <Star size={13} fill="currentColor" className="text-yellow-400" />

      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingBadge;
