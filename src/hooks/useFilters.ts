import { useState, useCallback } from 'react';
import { Activity } from '../types';

interface Filters {
  category: string;
  district: string;
  city: string;
  provider: string;
}

export const useFilters = (activities: Activity[]) => {
  const [filters, setFilters] = useState<Filters>({
    category: '',
    district: '',
    city: '',
    provider: '',
  });

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: '',
      district: '',
      city: '',
      provider: '',
    });
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (filters.category && activity.type !== filters.category) return false;
    if (filters.district && activity.district !== filters.district) return false;
    if (filters.city && activity.city !== filters.city) return false;
    if (filters.provider && activity.provider !== filters.provider) return false;
    return true;
  });

  // Generate filter options
  const categoryOptions = [...new Set(activities.map(a => a.type))].map(type => ({
    value: type,
    label: type,
  }));

  const districtOptions = [...new Set(activities.map(a => a.district))].map(district => ({
    value: district,
    label: district,
  }));

  const cityOptions = [...new Set(activities.map(a => a.city))].map(city => ({
    value: city,
    label: city,
  }));

  const providerOptions = [...new Set(activities.map(a => a.provider))].map(provider => ({
    value: provider,
    label: provider,
  }));

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredActivities,
    filterOptions: {
      categoryOptions,
      districtOptions,
      cityOptions,
      providerOptions,
    },
  };
};