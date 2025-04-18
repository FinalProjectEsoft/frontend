import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { bookings } from '../data/mockData';

const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [updateData, setUpdateData] = useState({
    date: '',
    participants: 1,
    comments: '',
  });

  // Restrict access to authenticated customers
  if (!user || user.role !== 'customer') {
    navigate('/login');
    return null;
  }

  // Filter bookings for the current user
  const userBookings = bookings.filter((booking) => booking.customerId === user.id);

  const handleUpdateOpen = (booking: any) => {
    setSelectedBooking(booking);
    setUpdateData({
      date: booking.date,
      participants: booking.participants,
      comments: booking.comments || '',
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update logic (replace with API call)
    console.log('Updating booking:', selectedBooking.id, updateData);
    setUpdateModalOpen(false);
  };

  const handleCancelOpen = (booking: any) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    // Mock cancel logic (replace with API call)
    console.log('Canceling booking:', selectedBooking.id);
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Card className="p-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">My Bookings</h1>
          {userBookings.length === 0 ? (
            <p className="text-center text-gray-600">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Activity/Package</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {booking.activityName || booking.packageName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize whitespace-nowrap">{booking.status}</td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => handleUpdateOpen(booking)}
                            >
                              <Edit size={16} className="mr-1" /> Update
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleCancelOpen(booking)}
                            >
                              <Trash2 size={16} className="mr-1" /> Cancel
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Update Modal */}
        {updateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="mb-4 text-xl font-semibold">Update Booking</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <Input
                  type="date"
                  label="Date"
                  value={updateData.date}
                  onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  label="Number of Participants"
                  min="1"
                  value={updateData.participants.toString()}
                  onChange={(e) => setUpdateData({ ...updateData, participants: parseInt(e.target.value) })}
                  required
                />
                <Input
                  as="textarea"
                  label="Comments"
                  value={updateData.comments}
                  onChange={(e) => setUpdateData({ ...updateData, comments: e.target.value })}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setUpdateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Booking</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="mb-4 text-xl font-semibold">Cancel Booking</h2>
              <p className="mb-6 text-gray-600">
                Are you sure you want to cancel your booking for{' '}
                <strong>{selectedBooking.activityName || selectedBooking.packageName}</strong> on{' '}
                {selectedBooking.date}?
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
                    Close
                </Button>
                <Button
                  className="text-white bg-red-600 hover:bg-red-700"
                  onClick={handleCancelConfirm}
                >
                  Confirm Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;