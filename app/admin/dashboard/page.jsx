'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUserCount(data.count));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg">Total Registered Users: {userCount ?? 'Loading...'}</p>
    </div>
  );
}
