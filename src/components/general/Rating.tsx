import { Star } from "lucide-react";

interface RatingProps {
  number: number;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400" : "text-gray-400"
        }`}
      />
    );
  }
  return stars;
};

const Rating: React.FC<RatingProps> = ({ number }) => {
  return <div className="flex items-center mt-2">{renderStars(Math.round(number))}</div>;
};

export default Rating;
