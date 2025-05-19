import React from 'react';
import { FiUpload, FiMessageSquare, FiFileText, FiAward, FiBarChart2, FiUser, FiClock } from 'react-icons/fi';

const DashboardData = () => {
  // Mock data - in a real app this would come from props or state
  const stats = {
    interviewsCompleted: 12,
    averageScore: 84,
    improvementAreas: ['Communication', 'Technical Depth'],
    upcomingInterviews: 2,
  };

  const recentActivities = [
    { id: 1, type: 'Mock Interview', date: '2 hours ago', score: 88 },
    { id: 2, type: 'Resume Analysis', date: '1 day ago', score: 92 },
    { id: 3, type: 'Behavioral Practice', date: '3 days ago', score: 76 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Prepare for Your Next Interview with AI</h1>
        <p className="opacity-90 max-w-2xl">
          Upload your resume, answer tailored questions, and get personalized feedback to help you succeed in your job search.
        </p>
      </div>

      {/* Quick Stats */}
      

      {/* Process Steps */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <ProcessStep 
            icon={<FiUpload className="w-8 h-8" />}
            title="Upload Resume"
            description="Share your resume to generate personalized interview questions"
            stepNumber={1}
            active={true}
          />
          <ProcessStep 
            icon={<FiMessageSquare className="w-8 h-8" />}
            title="Answer Questions"
            description="Respond to AI-generated questions through your webcam"
            stepNumber={2}
          />
          <ProcessStep 
            icon={<FiFileText className="w-8 h-8" />}
            title="Get Feedback"
            description="Receive detailed feedback and actionable suggestions"
            stepNumber={3}
          />
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, title, value, trend, color }) => {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start">
      <div className={`rounded-full p-3 ${colors[color]} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{trend}</p>
      </div>
    </div>
  );
};

const ProcessStep = ({ icon, title, description, stepNumber, active = false }) => {
  return (
    <div className={`p-8 text-center ${active ? 'bg-indigo-50' : ''}`}>
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold mb-4 ${active ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
        {stepNumber}
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${active ? 'text-indigo-700' : 'text-gray-800'}`}>{title}</h3>
      <p className={`text-sm ${active ? 'text-indigo-600' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  return (
    <div className="p-6 flex items-center">
      <div className="bg-indigo-50 rounded-lg p-3 mr-4 text-indigo-600">
        {activity.type.includes('Interview') ? (
          <FiMessageSquare className="w-5 h-5" />
        ) : (
          <FiFileText className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{activity.type}</h4>
        <p className="text-sm text-gray-500">{activity.date}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        activity.score > 85 ? 'bg-green-100 text-green-800' :
        activity.score > 70 ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {activity.score}%
      </div>
    </div>
  );
};

const ActionButton = ({ title, description, icon, color }) => {
  const colors = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    green: 'bg-green-600 hover:bg-green-700',
  };

  return (
    <button className={`w-full text-left p-4 rounded-lg text-white ${colors[color]} transition-colors duration-200`}>
      <div className="flex items-center">
        <div className="mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default DashboardData;