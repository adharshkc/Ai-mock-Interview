import React from 'react'

const DashboardData = () => {
  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prepare for Your Next Interview with AI</h1>
          <p className="text-xl text-gray-600">
            Upload your resume, answer questions tailored to your experience, and get personalized feedback to help you succeed.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-indigo-600 text-white p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">1. Upload Resume</h2>
              <p className="text-indigo-100">Share your resume to generate personalized interview questions</p>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">2. Answer Questions</h2>
              <p className="text-gray-600">Respond to AI-generated questions through your webcam</p>
            </div>
            
            <div className="bg-gray-50 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">3. Get Feedback</h2>
              <p className="text-gray-600">Receive detailed feedback and actionable suggestions</p>
            </div>
          </div>
        </div>
         
        
      </div>
    </div>
  )
}

export default DashboardData