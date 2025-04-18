import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { bookings } from '../data/mockData';

const ProviderNotifications: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Restrict access to service provider users
  if (!user || user.role !== 'provider') {
    navigate('/login');
    return null;
  }

  // Filter approved bookings (mock provider ID matching)
  const approvedBookings = bookings.filter(
    (booking) => booking.status === 'approved' && booking.providerId === user.id
  );

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Card className="p-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Provider Notifications</h1>
          {approvedBookings.length === 0 ? (
            <p className="text-center text-gray-600">No approved bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Activity/Package
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {booking.activityName || booking.packageName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(booking)}
                        >
                          <Eye size={16} className="mr-1" /> View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Details Modal */}
        {detailModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="mb-4 text-xl font-semibold">Booking Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer</p>
                  <p className="text-sm text-gray-900">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Activity/Package</p>
                  <p className="text-sm text-gray-900">
                    {selectedBooking.activityName || selectedBooking.packageName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Date</p>
                  <p className="text-sm text-gray-900">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-sm text-gray-900 capitalize">{selectedBooking.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Comments</p>
                  <p className="text-sm text-gray-900">
                    {selectedBooking.comments || 'No comments'}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderNotifications;