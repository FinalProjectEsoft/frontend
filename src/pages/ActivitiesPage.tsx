import React, { useState } from 'react';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ActivityCard from '../components/activities/ActivityCard';
import PackageCard from '../components/packages/PackageCard';
import { activities, packages } from '../data/mockData';
import { useFilters } from '../hooks/useFilters';
import { Filter, SlidersHorizontal } from 'lucide-react';

const ActivitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'activities' | 'packages'>('activities');
  const [showFilters, setShowFilters] = useState(true);
  const { 
    filters, 
    updateFilter, 
    resetFilters, 
    filteredActivities, 
    filterOptions 
  } = useFilters(activities);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Explore Sri Lanka's Adventures
          </h1>
          
          <button 
            onClick={toggleFilters}
            className="mt-3 sm:mt-0 flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <SlidersHorizontal size={18} className="mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-700">Filters</h2>
              <Button 
                variant="outline" 
                onClick={resetFilters}
                size="sm"
                className="mt-2 sm:mt-0"
              >
                Reset Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                label="Activity Type"
                name="category"
                value={filters.category}
                onChange={(value) => updateFilter('category', value)}
                options={[
                  { value: '', label: 'All Categories' },
                  ...filterOptions.categoryOptions,
                ]}
              />
              <Select
                label="District"
                name="district"
                value={filters.district}
                onChange={(value) => updateFilter('district', value)}
                options={[
                  { value: '', label: 'All Districts' },
                  ...filterOptions.districtOptions,
                ]}
              />
              <Select
                label="City"
                name="city"
                value={filters.city}
                onChange={(value) => updateFilter('city', value)}
                options={[
                  { value: '', label: 'All Cities' },
                  ...filterOptions.cityOptions,
                ]}
              />
              <Select
                label="Provider"
                name="provider"
                value={filters.provider}
                onChange={(value) => updateFilter('provider', value)}
                options={[
                  { value: '', label: 'All Providers' },
                  ...filterOptions.providerOptions,
                ]}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'activities'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'packages'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('packages')}
          >
            Packages
          </button>
        </div>

        {/* Content */}
        {activeTab === 'activities' ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
              </p>
            </div>
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your filters or check back later for new adventures.
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {packages.length} {packages.length === 1 ? 'package' : 'packages'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;