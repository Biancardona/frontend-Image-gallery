import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getAllUsers();
      setUsers(response.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getUser(userId);
      setSelectedUser(response.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching user details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      setLoading(true);
      setError('');
      await userService.updateUser(userId, userData);
      await fetchUsers();
      if (selectedUser?.id === userId) {
        await handleUserSelect(userId);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this user and all their images?'
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await userService.deleteUser(userId);
      await fetchUsers();
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !users.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Users List */}
        <div className='md:col-span-1'>
          <h2 className='text-xl font-semibold mb-4'>Users</h2>
          <div className='bg-white shadow rounded-lg'>
            {users.map((user) => (
              <div
                key={user.id}
                className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleUserSelect(user.id)}
              >
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium'>{user.username}</p>
                    <p className='text-sm text-gray-500'>{user.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Details */}
        <div className='md:col-span-2'>
          {selectedUser ? (
            <div className='bg-white shadow rounded-lg p-6'>
              <h2 className='text-xl font-semibold mb-4'>User Details</h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Username
                  </label>
                  <input
                    type='text'
                    value={selectedUser.username}
                    onChange={(e) =>
                      handleUpdateUser(selectedUser.id, {
                        username: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    value={selectedUser.email}
                    onChange={(e) =>
                      handleUpdateUser(selectedUser.id, {
                        email: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Role
                  </label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      handleUpdateUser(selectedUser.id, {
                        role: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  >
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Status
                  </label>
                  <select
                    value={selectedUser.isActive ? 'active' : 'inactive'}
                    onChange={(e) =>
                      handleUpdateUser(selectedUser.id, {
                        isActive: e.target.value === 'active',
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                </div>

                <div className='pt-4'>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className='w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  >
                    Delete User
                  </button>
                </div>
              </div>

              {/* User's Images */}
              <div className='mt-8'>
                <h3 className='text-lg font-medium mb-4'>User's Images</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {selectedUser.Images?.map((image) => (
                    <div
                      key={image.id}
                      className='border rounded-lg overflow-hidden'
                    >
                      <img
                        src={`http://localhost:3001/uploads/${image.filename}`}
                        alt={image.description || 'User image'}
                        className='w-full h-32 object-cover'
                      />
                      <div className='p-2'>
                        <p className='text-sm text-gray-600 truncate'>
                          {image.description}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {new Date(image.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-white shadow rounded-lg p-6 text-center text-gray-500'>
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
