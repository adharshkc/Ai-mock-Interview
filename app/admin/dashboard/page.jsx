'use client';
import { useEffect, useState } from 'react';
import { User, Search, UserPlus, Users, Activity, ArrowUpRight, Calendar, Mail, Phone, Trash2, X } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data.users || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      (user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.emailAddresses?.[0]?.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'active') return matchesSearch && user.lastSignInAt;
    if (selectedTab === 'inactive') return matchesSearch && !user.lastSignInAt;
    
    return matchesSearch;
  });

  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.emailAddress) {
      return; // Basic validation
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send a request to your API
      // Mock implementation for demonstration
      const newUserData = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailAddresses: [
          {
            emailAddress: newUser.emailAddress,
            verification: { status: 'unverified' }
          }
        ],
        createdAt: new Date().toISOString(),
        lastSignInAt: null,
      };
      
      setUsers(prev => [newUserData, ...prev]);
      setNewUser({ firstName: '', lastName: '', emailAddress: '' });
      setShowAddUserModal(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteUser = async () => {
  try {
    const response = await fetch(`/api/admin/delete-user?userId=${userToDelete.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    // Update UI on successful deletion
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};

  
  const Stats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            <h3 className="text-2xl font-bold">{users.length}</h3>
          </div>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <ArrowUpRight className="h-3 w-3 mr-1" />
          <span>12% increase</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
            <h3 className="text-2xl font-bold">{users.filter(u => u.lastSignInAt).length}</h3>
          </div>
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <ArrowUpRight className="h-3 w-3 mr-1" />
          <span>8% increase</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">New This Week</p>
            <h3 className="text-2xl font-bold">24</h3>
          </div>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <UserPlus className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <ArrowUpRight className="h-3 w-3 mr-1" />
          <span>18% increase</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
            <h3 className="text-2xl font-bold">68%</h3>
          </div>
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            <Activity className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <ArrowUpRight className="h-3 w-3 mr-1" />
          <span>5% increase</span>
        </div>
      </div>
    </div>
  );

  // Add User Modal Component
  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New User</h3>
          <button 
            onClick={() => setShowAddUserModal(false)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={newUser.emailAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowAddUserModal(false)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUser}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-sm bg-blue-600 text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Adding...' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal Component
  const DeleteConfirmModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Are you sure you want to delete the user {userToDelete?.firstName} {userToDelete?.lastName}? This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmDeleteUser}
            className="px-4 py-2 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage and monitor your user base</p>
          </div>
          {/* <button 
            onClick={() => setShowAddUserModal(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </button> */}
        </div>
        
        <Stats />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex space-x-4">
                <button 
                  onClick={() => setSelectedTab('all')}
                  className={`px-3 py-2 text-sm rounded-md ${selectedTab === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  All Users
                </button>
                <button 
                  onClick={() => setSelectedTab('active')}
                  className={`px-3 py-2 text-sm rounded-md ${selectedTab === 'active' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  Active Users
                </button>
                <button 
                  onClick={() => setSelectedTab('inactive')}
                  className={`px-3 py-2 text-sm rounded-md ${selectedTab === 'inactive' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  Inactive Users
                </button>
              </div>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/60">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Sign In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                              {user.imageUrl ? (
                                <img src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} className="h-10 w-10 rounded-full" />
                              ) : (
                                getInitials(user)
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {user.id?.substring(0, 8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{user.emailAddresses?.[0]?.emailAddress}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            {user.emailAddresses?.[0]?.verification?.status === 'verified' ? (
                              <span className="flex items-center text-green-500">
                                <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                                Verified
                              </span>
                            ) : (
                              <span className="flex items-center text-amber-500">
                                <span className="h-2 w-2 bg-amber-500 rounded-full mr-1"></span>
                                Unverified
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.lastSignInAt ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(user.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(user.lastSignInAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No users found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  Previous
                </button>
                <button className="px-3 py-1 border border-blue-600 dark:border-blue-500 rounded-md text-sm bg-blue-600 dark:bg-blue-500 text-white">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render Modals */}
      {showAddUserModal && <AddUserModal />}
      {showDeleteConfirm && <DeleteConfirmModal />}
    </div>
  );
}