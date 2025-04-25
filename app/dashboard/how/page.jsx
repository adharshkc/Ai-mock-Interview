// import React from 'react'

// function How() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default How

import React from 'react';
import { Lightbulb, Star, VideoIcon, CheckCircle } from 'lucide-react';

function How() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center shadow-sm text-gray-800 mb-8">
        How the AI Mock Interview Generator Works
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm shadow-blue-700">
          <div className="flex items-center mb-4">
            <Lightbulb className="text-blue-900 h-8 w-8 mr-3" />
            <h2 className="text-xl font-semibold">1. Sign In and Get Started</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Sign in to the site and create your mock interview by providing details like your <strong>Job Position</strong>, <strong>Job Description/Tech Stack</strong>, 
            and <strong>Years of Experience</strong>. You can also upload your resume for a tailored experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm shadow-blue-700">
          <div className="flex items-center mb-4">
            <VideoIcon className="text-blue-900 h-8 w-8 mr-3" />
            <h2 className="text-xl font-semibold">2. Prepare and Start</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Switch on your webcam and carefully read the provided instructions before starting the interview. This ensures you're fully prepared for the experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm shadow-blue-700">
          <div className="flex items-center mb-4">
            <CheckCircle className="text-blue-900 h-8 w-8 mr-3" />
            <h2 className="text-xl font-semibold">3. Record Your Responses</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Answer the interview questions while recording your responses. This helps the system provide accurate feedback based on your performance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm shadow-blue-700">
          <div className="flex items-center mb-4">
            <Star className="text-blue-900 h-8 w-8 mr-3" />
            <h2 className="text-xl font-semibold">4. Review Your Feedback</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Slide down to the feedback page to review your interview ratings, insights, and the correct answers to the questions. Use this to improve your skills.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm shadow-blue-700">
          <div className="flex items-center mb-4">
            <Star className="text-blue-900 h-8 w-8 mr-3" />
            <h2 className="text-xl font-semibold">5. Upgrade for More Features</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Upgrade your plan for enhanced and personalized feedback, additional support, and advanced features to take your interview preparation to the next level.
          </p>
        </div>
      </div>
    </div>
  );
}

export default How

