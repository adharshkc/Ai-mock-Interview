import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

function Dashboard() {
  return (
    <div className='p-10 pt-0'>
      {/* Main Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* Text Section */}
        <div>
          <div className='mt-0'>
            <AddNewInterview />
          </div>
        </div>
        {/* Button Section (replacing Image) */}
        <div className='flex justify-center'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 text-lg'>
            Schedule Interview
          </button>
        </div>
      </div>
      {/* Previous Interview Lists */}
      <div className='mt-10'>
        <InterviewList />
      </div>
    </div>
  );
}

export default Dashboard;