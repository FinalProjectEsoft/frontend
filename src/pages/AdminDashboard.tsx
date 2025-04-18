import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Download, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import { activities, packages, bookings } from '../data/mockData';
import Papa from 'papaparse';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [editActivityModal, setEditActivityModal] = useState(false);
  const [editPackageModal, setEditPackageModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, type: '', id: '' });
  const [activityData, setActivityData] = useState({
    id: '', name: '', type: '', price: 0, description: '', availability: true,
    district: '', city: '', provider: '',
  });
  const [packageData, setPackageData] = useState({
    id: '', name: '', price: 0, description: '', activityIds: [] as string[],
  });
  const [reportFilters, setReportFilters] = useState({ activityId: '', startDate: '', endDate: '' });

  // Restrict access to admin users
  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  // Mock data operations (replace with API calls)
  const handleActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving activity:', activityData);
    setEditActivityModal(false);
    setActivityData({ id: '', name: '', type: '', price: 0, description: '', availability: true, district: '', city: '', provider: '' });
  };

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving package:', packageData);
    setEditPackageModal(false);
    setPackageData({ id: '', name: '', price: 0, description: '', activityIds: [] });
  };

  const handleDelete = () => {
    console.log(`Deleting ${deleteModal.type} with ID: ${deleteModal.id}`);
    setDeleteModal({ open: false, type: '', id: '' });
  };

  const handleBookingAction = (bookingId: string, action: 'approve' | 'cancel') => {
    console.log(`${action} booking: ${bookingId}`);
    // Mock email notification
    console.log(`Email sent for ${action} booking: ${bookingId}`);
  };

  const handleReportDownload = () => {
    const filteredBookings = bookings.filter((b) => {
      if (reportFilters.activityId && (b.activityId !== reportFilters.activityId)) return false;
      if (reportFilters.startDate && new Date(b.date) < new Date(reportFilters.startDate)) return false;
      if (reportFilters.endDate && new Date(b.date) > new Date(reportFilters.endDate)) return false;
      return true;
    });
    const csv = Papa.unparse(filteredBookings.map(b => ({
      ID: b.id,
      Customer: b.customerName,
      Activity: b.activityName || b.packageName,
      Date: b.date,
      Status: b.status,
    })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="flex px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Sidebar */}
        <Card className="w-64 p-4 mr-6">
          <h2 className="mb-4 text-xl font-bold">Admin Dashboard</h2>
          <nav className="space-y-2">
            {['overview', 'activities', 'packages', 'bookings', 'reports'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-4 py-2 rounded ${activeSection === section ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          {activeSection === 'overview' && (
            <Card className="p-6">
              <h1 className="mb-6 text-3xl font-bold">Overview</h1>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{activities.length}</h3>
                  <p className="text-gray-600">Total Activities</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{packages.length}</h3>
                  <p className="text-gray-600">Total Packages</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{bookings.length}</h3>
                  <p className="text-gray-600">Total Bookings</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{pendingBookings}</h3>
                  <p className="text-gray-600">Pending Approvals</p>
                </Card>
              </div>
            </Card>
          )}

          {activeSection === 'activities' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Manage Activities</h1>
                <Button onClick={() => setEditActivityModal(true)}>Add Activity</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Price (Rs.)</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Availability</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{activity.name}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{activity.type}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">Rs. {activity.price}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{activity.availability ? 'Available' : 'Unavailable'}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                              setActivityData(activity);
                              setEditActivityModal(true);
                            }}
                          >
                            <Edit size={16} className="mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600"
                            onClick={() => setDeleteModal({ open: true, type: 'activity', id: activity.id })}
                          >
                            <Trash2 size={16} className="mr-1" /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'packages' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Manage Packages</h1>
                <Button onClick={() => setEditPackageModal(true)}>Add Package</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Price (Rs.)</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Activities</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {packages.map((pkg) => (
                      <tr key={pkg.id}>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{pkg.name}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">Rs. {pkg.price}</td>
                        <td className="px-6 py-4 text-sm">{pkg.activities.map(a => a.name).join(', ')}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                              setPackageData({ ...pkg, activityIds: pkg.activities.map(a => a.id) });
                              setEditPackageModal(true);
                            }}
                          >
                            <Edit size={16} className="mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600"
                            onClick={() => setDeleteModal({ open: true, type: 'package', id: pkg.id })}
                          >
                            <Trash2 size={16} className="mr-1" /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'bookings' && (
            <Card className="p-6">
              <h1 className="mb-6 text-3xl font-bold">Manage Bookings</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Activity/Package</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.customerName}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.activityName || booking.packageName}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.date}</td>
                        <td className="px-6 py-4 text-sm capitalize whitespace-nowrap">{booking.status}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleBookingAction(booking.id, 'approve')}
                              >
                                <Check size={16} className="mr-1" /> Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600"
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                              >
                                <X size={16} className="mr-1" /> Cancel
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'reports' && (
            <Card className="p-6">
              <h1 className="mb-6 text-3xl font-bold">Reports</h1>
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                <Select
                  label="Activity/Package"
                  value={reportFilters.activityId}
                  onChange={(value) => setReportFilters({ ...reportFilters, activityId: value })}
                  options={[
                    { value: '', label: 'All' },
                    ...activities.map(a => ({ value: a.id, label: a.name })),
                    ...packages.map(p => ({ value: p.id, label: p.name })),
                  ]}
                />
                <Input
                  type="date"
                  label="Start Date"
                  value={reportFilters.startDate}
                  onChange={(e) => setReportFilters({ ...reportFilters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="End Date"
                  value={reportFilters.endDate}
                  onChange={(e) => setReportFilters({ ...reportFilters, endDate: e.target.value })}
                />
              </div>
              <Button onClick={handleReportDownload} className="mb-6">
                <Download size={16} className="mr-1" /> Download Report
              </Button>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Activity/Package</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings
                      .filter((b) => {
                        if (reportFilters.activityId && (b.activityId !== reportFilters.activityId && b.packageId !== reportFilters.activityId)) return false;
                        if (reportFilters.startDate && new Date(b.date) < new Date(reportFilters.startDate)) return false;
                        if (reportFilters.endDate && new Date(b.date) > new Date(reportFilters.endDate)) return false;
                        return true;
                      })
                      .map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.id}</td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.customerName}</td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.activityName || booking.packageName}</td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.date}</td>
                          <td className="px-6 py-4 text-sm capitalize whitespace-nowrap">{booking.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Activity Modal */}
      {editActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-lg p-6">
            <h2 className="mb-4 text-xl font-semibold">{activityData.id ? 'Edit' : 'Add'} Activity</h2>
            <form onSubmit={handleActivitySubmit} className="space-y-4">
              <Input
                label="Name"
                value={activityData.name}
                onChange={(e) => setActivityData({ ...activityData, name: e.target.value })}
                required
              />
              <Select
                label="Type"
                value={activityData.type}
                onChange={(value) => setActivityData({ ...activityData, type: value })}
                options={[
                  { value: '', label: 'Select Type' },
                  { value: 'Surfing', label: 'Surfing' },
                  { value: 'Trekking', label: 'Trekking' },
                  { value: 'Rafting', label: 'Rafting' },
                  { value: 'Diving', label: 'Diving' },
                  { value: 'Safari', label: 'Safari' },
                  { value: 'Climbing', label: 'Climbing' },
                ]}
                required
              />
              <Input
                type="number"
                label="Price (Rs.)"
                value={activityData.price.toString()}
                onChange={(e) => setActivityData({ ...activityData, price: parseFloat(e.target.value) })}
                required
              />
              <Input
                label="Description"
                as="textarea"
                value={activityData.description}
                onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
                required
              />
              <Select
                label="Availability"
                value={activityData.availability ? 'true' : 'false'}
                onChange={(value) => setActivityData({ ...activityData, availability: value === 'true' })}
                options={[
                  { value: 'true', label: 'Available' },
                  { value: 'false', label: 'Unavailable' },
                ]}
                required
              />
              <Input
                label="District"
                value={activityData.district}
                onChange={(e) => setActivityData({ ...activityData, district: e.target.value })}
                required
              />
              <Input
                label="City"
                value={activityData.city}
                onChange={(e) => setActivityData({ ...activityData, city: e.target.value })}
                required
              />
              <Input
                label="Provider"
                value={activityData.provider}
                onChange={(e) => setActivityData({ ...activityData, provider: e.target.value })}
                required
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditActivityModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Package Modal */}
      {editPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-lg p-6">
            <h2 className="mb-4 text-xl font-semibold">{packageData.id ? 'Edit' : 'Add'} Package</h2>
            <form onSubmit={handlePackageSubmit} className="space-y-4">
              <Input
                label="Name"
                value={packageData.name}
                onChange={(e) => setPackageData({ ...packageData, name: e.target.value })}
                required
              />
              <Input
                type="number"
                label="Price (Rs.)"
                value={packageData.price.toString()}
                onChange={(e) => setPackageData({ ...packageData, price: parseFloat(e.target.value) })}
                required
              />
              <Input
                label="Description"
                as="textarea"
                value={packageData.description}
                onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
                required
              />
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Activities</label>
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={packageData.activityIds.includes(activity.id)}
                      onChange={(e) => {
                        const updatedIds = e.target.checked
                          ? [...packageData.activityIds, activity.id]
                          : packageData.activityIds.filter((id) => id !== activity.id);
                        setPackageData({ ...packageData, activityIds: updatedIds });
                      }}
                      className="mr-2"
                    />
                    <span>{activity.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditPackageModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="mb-4 text-xl font-semibold">Confirm Delete</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this {deleteModal.type}?
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteModal({ open: false, type: '', id: '' })}>
                Cancel
              </Button>
              <Button className="text-white bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;