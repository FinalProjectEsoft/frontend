import React from 'react';
import { Review } from '../../types';
import { Star } from 'lucide-react';
import Card from '../ui/Card';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="mb-4">
      <Card.Content>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-800">{review.userName}</h4>
          <span className="text-xs text-gray-500">{review.date}</span>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < review.rating ? '#FBBF24' : 'none'}
              stroke={i < review.rating ? '#FBBF24' : '#D1D5DB'}
              className="mr-1"
            />
          ))}
        </div>
        
        <p className="text-gray-700 text-sm">{review.comment}</p>
      </Card.Content>
    </Card>
  );
};

export default ReviewCard;