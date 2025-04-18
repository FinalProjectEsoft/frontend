import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ReviewCard from '../components/reviews/ReviewCard';
import { activities, packages, reviews } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const ActivityDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMap, setShowMap] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    participants: 1,
    passportNumber: '',
    comments: '',
  });
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Check if it's a package or activity
  const isPackage = window.location.pathname.includes('/packages/');
  const item = isPackage 
    ? packages.find(p => p.id === id)
    : activities.find(a => a.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Item not found</h2>
          <Button onClick={() => navigate('/activities')} className="mt-4">
            Back to Activities
          </Button>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
    setNewReview({ rating: 5, comment: '' });
  };

  const itemReviews = reviews[id] || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="relative">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Column - Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
            
            {!isPackage && (
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={20} className="mr-2" />
                <span>{(item as any).city}, {(item as any).district}</span>
                <button
                  onClick={() => setShowMap(true)}
                  className="ml-4 text-blue-600 hover:text-blue-800 text-sm"
                >
                  View on Map
                </button>
              </div>
            )}

            <p className="text-gray-600 mb-6">{item.description}</p>

            {isPackage && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Included Activities:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(item as any).activities.map((activity: any) => (
                    <li key={activity.id}>{activity.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Book Now</h2>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <Input
                  type="date"
                  label="Date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  label="Number of Participants"
                  min="1"
                  value={bookingData.participants}
                  onChange={(e) => setBookingData({ ...bookingData, participants: parseInt(e.target.value) })}
                  required
                />
                <Input
                  type="text"
                  label="Passport Number"
                  value={bookingData.passportNumber}
                  onChange={(e) => setBookingData({ ...bookingData, passportNumber: e.target.value })}
                  required
                />
                <Input
                  as="textarea"
                  label="Special Requirements"
                  value={bookingData.comments}
                  onChange={(e) => setBookingData({ ...bookingData, comments: e.target.value })}
                />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${item.price} USD
                  </span>
                  <Button type="submit">
                    Book Now
                  </Button>
                </div>
              </form>
              {bookingSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                  Booking submitted successfully!
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              
              {/* Review Form */}
              <form onSubmit={handleReviewSubmit} className="mb-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="text-yellow-400 focus:outline-none"
                    >
                      <Star
                        size={24}
                        fill={star <= newReview.rating ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
                <Input
                  as="textarea"
                  placeholder="Write your review..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                />
                <Button type="submit" className="mt-2">
                  Submit Review
                </Button>
              </form>
              
              {reviewSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  Review submitted successfully!
                </div>
              )}

              {/* Review List */}
              <div className="space-y-4">
                {itemReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-3xl">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Location</h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="h-[400px] bg-gray-100 rounded">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${(item as any).city},${(item as any).district},Sri+Lanka`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetailsPage;