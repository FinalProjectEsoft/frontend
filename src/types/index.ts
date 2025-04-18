export type UserRole = 'customer' | 'admin' | 'service-provider';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Activity {
  id: string;
  name: string;
  type: string;
  district: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  provider: string;
  description: string;
  price: number;
  imageUrl: string;
  availability: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  activities: Activity[];
  imageUrl: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  passportNumber?: string;
  activityId?: string;
  activityName?: string;
  packageId?: string;
  packageName?: string;
  date: string;
  participants: number;
  comments?: string;
  status: 'pending' | 'approved' | 'cancelled';
}