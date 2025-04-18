import { Activity, Booking, Package, Review, User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '3',
    name: 'Beach Adventures Ltd',
    email: 'provider@example.com',
    role: 'service-provider',
  },
];

export const activities: Activity[] = [
  {
    id: '1',
    name: 'Surfing in Arugam Bay',
    type: 'Surfing',
    district: 'Ampara',
    city: 'Arugam Bay',
    location: {
      lat: 6.8392,
      lng: 81.8343,
    },
    provider: 'Beach Adventures Ltd',
    description: 'Experience world-class surfing at the famous Arugam Bay, one of Sri Lanka\'s top surfing destinations. Suitable for beginners and advanced surfers alike.',
    price: 45,
    imageUrl: 'https://images.pexels.com/photos/1654498/pexels-photo-1654498.jpeg',
    availability: true,
  },
  {
    id: '2',
    name: 'Hiking in Ella Rock',
    type: 'Trekking',
    district: 'Badulla',
    city: 'Ella',
    location: {
      lat: 6.8667,
      lng: 81.0466,
    },
    provider: 'Hill Country Trekkers',
    description: 'Climb to the summit of Ella Rock for breathtaking panoramic views of the surrounding hills and valleys. A moderately challenging trek with a rewarding vista.',
    price: 30,
    imageUrl: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
    availability: true,
  },
  {
    id: '3',
    name: 'White Water Rafting in Kitulgala',
    type: 'Rafting',
    district: 'Kegalle',
    city: 'Kitulgala',
    location: {
      lat: 6.9895,
      lng: 80.4128,
    },
    provider: 'Rapids Adventure',
    description: 'Navigate the thrilling rapids of the Kelani River in Kitulgala. This exhilarating white water rafting experience is perfect for adrenaline seekers.',
    price: 55,
    imageUrl: 'https://images.pexels.com/photos/1732278/pexels-photo-1732278.jpeg',
    availability: true,
  },
  {
    id: '4',
    name: 'Scuba Diving in Hikkaduwa',
    type: 'Diving',
    district: 'Galle',
    city: 'Hikkaduwa',
    location: {
      lat: 6.1395,
      lng: 80.1063,
    },
    provider: 'Blue Ocean Divers',
    description: 'Explore the vibrant coral reefs and marine life in the clear waters of Hikkaduwa. Perfect for both beginners and certified divers.',
    price: 75,
    imageUrl: 'https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg',
    availability: true,
  },
  {
    id: '5',
    name: 'Safari at Yala National Park',
    type: 'Safari',
    district: 'Hambantota',
    city: 'Yala',
    location: {
      lat: 6.3735,
      lng: 81.5089,
    },
    provider: 'Wildlife Expeditions',
    description: 'Embark on an exciting safari to spot leopards, elephants, and other wildlife in their natural habitat at Yala National Park.',
    price: 65,
    imageUrl: 'https://images.pexels.com/photos/2499282/pexels-photo-2499282.jpeg',
    availability: true,
  },
  {
    id: '6',
    name: 'Rock Climbing in Knuckles',
    type: 'Climbing',
    district: 'Kandy',
    city: 'Knuckles',
    location: {
      lat: 7.4667,
      lng: 80.7833,
    },
    provider: 'Mountain Climbers SL',
    description: 'Challenge yourself with rock climbing in the beautiful Knuckles Mountain Range. Routes available for all skill levels.',
    price: 50,
    imageUrl: 'https://images.pexels.com/photos/1574324/pexels-photo-1574324.jpeg',
    availability: true,
  },
];

export const packages: Package[] = [
  {
    id: '1',
    name: 'East Coast Adventure Week',
    description: 'A thrilling week of surfing in Arugam Bay and safari at Yala National Park. Perfect combination of water sports and wildlife!',
    price: 95,
    activities: [activities[0], activities[4]],
    imageUrl: 'https://images.pexels.com/photos/3617491/pexels-photo-3617491.jpeg',
  },
  {
    id: '2',
    name: 'Hill Country Explorer',
    description: 'Experience the beauty of Sri Lanka\'s hill country with hiking in Ella and rock climbing in Knuckles.',
    price: 70,
    activities: [activities[1], activities[5]],
    imageUrl: 'https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg',
  },
  {
    id: '3',
    name: 'Water Adventure Package',
    description: 'Dive into thrilling water sports with white water rafting in Kitulgala and scuba diving in Hikkaduwa.',
    price: 120,
    activities: [activities[2], activities[3]],
    imageUrl: 'https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg',
  },
];

export const reviews: Record<string, Review[]> = {
  '1': [
    {
      id: '1',
      userName: 'Sarah Williams',
      rating: 5,
      comment: 'Amazing surfing experience! The instructors were very professional and helpful. Definitely coming back!',
      date: '2023-11-15',
    },
    {
      id: '2',
      userName: 'Mike Johnson',
      rating: 4,
      comment: 'Great waves and beautiful beach. The only downside was the crowded area during peak hours.',
      date: '2023-10-22',
    },
  ],
  '2': [
    {
      id: '3',
      userName: 'Emma Davis',
      rating: 5,
      comment: 'The trek was challenging but the views were absolutely worth it! Our guide was knowledgeable and friendly.',
      date: '2023-12-05',
    },
  ],
};

export const bookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    passportNumber: 'AB123456',
    activityId: '1',
    activityName: 'Surfing in Arugam Bay',
    date: '2024-07-15',
    participants: 2,
    comments: 'We are beginners, would appreciate some basic training.',
    status: 'approved',
  },
  {
    id: '2',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    passportNumber: 'AB123456',
    packageId: '2',
    packageName: 'Hill Country Explorer',
    date: '2024-08-10',
    participants: 3,
    comments: 'We have some hiking experience.',
    status: 'pending',
  },
];