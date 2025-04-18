import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Activity } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Card className="h-full transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={activity.imageUrl} 
          alt={activity.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-2 py-1 text-xs">
          {activity.type}
        </div>
      </div>
      
      <Card.Content>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{activity.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{activity.city}, {activity.district}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-blue-600">${activity.price} USD</span>
          <Link to={`/activities/${activity.id}`}>
            <Button variant="outline" size="sm">
              See More
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ActivityCard;