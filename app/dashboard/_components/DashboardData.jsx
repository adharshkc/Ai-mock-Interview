'use client';
import React, { useState, useEffect } from 'react';
import { FiUpload, FiMessageSquare, FiFileText, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DashboardData = () => {
  // Sample images for the slideshow - using placeholder images
  const slideshowImages = [
    {
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop&crop=faces",
      title: "Professional Interview Preparation",
      subtitle: "Master your next career opportunity"
    },
    {
      url: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "AI-Powered Feedback",
      subtitle: "Get personalized insights to improve"
    },
    {
      url: "https://images.unsplash.com/photo-1559523182-a284c3fb7cff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Confidence Building",
      subtitle: "Practice makes perfect"
    },
    {
      url: "https://images.unsplash.com/photo-1653669487066-550c97ebea48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Career Success",
      subtitle: "Land your dream job"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner with Slideshow */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden mb-8 text-white relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Prepare for Your Next Interview with AI
            </h1>
            <p className="opacity-90 text-lg mb-6 max-w-2xl">
              Upload your resume, answer tailored questions, and get personalized feedback to help you succeed in your job search.
            </p>
            {/* <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors w-fit">
              Get Started Now
            </button> */}
          </div>

          {/* Slideshow */}
          <div className="relative h-64 lg:h-full min-h-[300px]">
            <div className="absolute inset-0 overflow-hidden">
              {slideshowImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slideshowImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

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

      {/* Additional Features Section with Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
            alt="Team collaboration"
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Practice with Confidence</h3>
            <p className="text-gray-600 mb-4">
              Our AI analyzes your responses and provides real-time feedback to help you improve your interview performance.
            </p>
            {/* <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              Learn More →
            </button> */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop"
            alt="Analytics dashboard"
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Get Your Feedbacks</h3>
            <p className="text-gray-600 mb-4">
              Monitor your improvement over time with detailed analytics and personalized recommendations.
            </p>
            {/* <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              View Analytics →
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessStep = ({ icon, title, description, stepNumber, active = false }) => {
  return (
    <div className={`p-8 text-center transition-all hover:bg-gray-50 ${active ? 'bg-indigo-50' : ''}`}>
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all ${active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold mb-4 transition-all ${active ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
        {stepNumber}
      </div>
      <h3 className={`text-lg font-semibold mb-2 transition-all ${active ? 'text-indigo-700' : 'text-gray-800'}`}>{title}</h3>
      <p className={`text-sm transition-all ${active ? 'text-indigo-600' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

export default DashboardData;