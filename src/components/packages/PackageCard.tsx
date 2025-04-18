import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface PackageCardProps {
  package: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  return (
    <Card className="h-full transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.imageUrl} 
          alt={pkg.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-0 left-0 bg-green-600 text-white px-2 py-1 text-xs">
          Package
        </div>
      </div>
      
      <Card.Content>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{pkg.name}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {pkg.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Included Activities:</h4>
          <ul className="text-xs text-gray-600 ml-4 list-disc">
            {pkg.activities.map((activity) => (
              <li key={activity.id}>{activity.name}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">${pkg.price} USD</span>
          <Link to={`/packages/${pkg.id}`}>
            <Button variant="outline" size="sm">
              See More
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PackageCard;