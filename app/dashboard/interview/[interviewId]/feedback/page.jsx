"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Lightbulb, Play, Clock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Feedback({ params: rawParams }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [overallRating, setOverallRating] = useState(0);
  const router = useRouter();

  // Mock YouTube course data
  const programmingCourses = [
    {
      id: 1,
      title: "Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      duration: "69 hours",
      thumbnail: "https://img.youtube.com/vi/EerdGm-ehJQ/maxresdefault.jpg",
      videoId: "EerdGm-ehJQ",
      description: "Master JavaScript with the most complete course! Projects, challenges, final exam, certificate",
      level: "Beginner to Advanced"
    },
    {
      id: 2,
      title: "React Tutorial for Beginners",
      instructor: "Programming with Mosh",
      duration: "8 hours",
      thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg",
      videoId: "SqcY0GlETPk",
      description: "Learn React.js in this complete course for beginners. Build a real project step by step.",
      level: "Beginner"
    },
    {
      id: 3,
      title: "Python Full Course 2024",
      instructor: "FreeCodeCamp",
      duration: "12 hours",
      thumbnail: "https://img.youtube.com/vi/eWRfhZUzrAc/maxresdefault.jpg",
      videoId: "eWRfhZUzrAc",
      description: "Complete Python course covering basics to advanced concepts with hands-on projects",
      level: "All Levels"
    },
    {
      id: 4,
      title: "Node.js and Express.js Course",
      instructor: "John Smilga",
      duration: "20 hours",
      thumbnail: "https://img.youtube.com/vi/qwfE7fSVaZM/maxresdefault.jpg",
      videoId: "qwfE7fSVaZM",
      description: "Build backend applications with Node.js and Express. Includes REST APIs and databases",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "TypeScript Course for Beginners",
      instructor: "Hitesh Choudhary",
      duration: "5 hours",
      thumbnail: "https://img.youtube.com/vi/30LWjhZzg50/maxresdefault.jpg",
      videoId: "30LWjhZzg50",
      description: "Learn TypeScript from scratch with practical examples and real-world projects",
      level: "Beginner"
    },
    {
      id: 6,
      title: "Data Structures and Algorithms",
      instructor: "Abdul Bari",
      duration: "15 hours",
      thumbnail: "https://img.youtube.com/vi/0IAPZzGSbME/maxresdefault.jpg",
      videoId: "0IAPZzGSbME",
      description: "Master DSA concepts essential for coding interviews and competitive programming",
      level: "Intermediate to Advanced"
    }
  ];

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await rawParams;
      setInterviewId(unwrappedParams.interviewId);
    }
    unwrapParams();
  }, [rawParams]);

  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);
  

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    if (result.length > 0) {
      const total = result.reduce(
        (sum, item) => sum + parseInt(item.rating),
        0,
      );
      const average = Math.round((total / result.length) * 10) / 5
      // const average = 4;
      setOverallRating(average);
    }

    setFeedbackList(result);
  };

  // Function to extract links from suggestions
  const extractLinksFromSuggestions = () => {
    const linkRegex = /https?:\/\/[^\s\]]+/g;
    const suggestionsWithLinks = [];

    feedbackList.forEach((item, index) => {
      if (item.suggestion && item.suggestion.trim() !== "") {
        const links = item.suggestion.match(linkRegex);
        if (links && links.length > 0) {
          suggestionsWithLinks.push({
            question: item.question,
            links: links,
            rating: item.rating,
            index: index,
          });
        }
      }
    });

    return suggestionsWithLinks;
  };

  const DownloadImage = () => {
    const handleDownload = () => {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = '/badge.jpg'; // Same path as your image
      link.download = 'certificate.jpg'; // The filename you want to save as
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    return handleDownload;
  };
  const handleDownload = DownloadImage();

  const openYouTubeVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulation!!
          </h2>
          <h2 className="text-2xl font-bold">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{overallRating}/5</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>

          {/* Individual Feedback Items */}
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-orange-700">
                      <strong>Your Answer:</strong> {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer:</strong> {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Feedback:</strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

          {/* Conditional rendering based on overall rating */}
          {overallRating < 3.5 ? (
            // Show links section for poor performance
            extractLinksFromSuggestions().length > 0 && (
              <Collapsible className="mt-7 mb-5">
                <CollapsibleTrigger className="p-4 flex justify-between bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg my-2 text-left gap-7 w-full hover:from-blue-100 hover:to-purple-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      🔗 Helpful Learning Resources (
                      {extractLinksFromSuggestions().reduce(
                        (total, item) => total + item.links.length,
                        0,
                      )}{" "}
                      links)
                    </span>
                  </div>
                  <ChevronsUpDown className="h-5 w-5 text-blue-600" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-4">
                    <p className="text-sm text-blue-700 font-medium mb-4">
                      Here are helpful links from your feedback suggestions:
                    </p>
                    {extractLinksFromSuggestions().map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                            Question {index + 1}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              parseInt(item.rating) <= 3
                                ? "bg-red-100 text-red-800"
                                : parseInt(item.rating) <= 6
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            Rating: {item.rating}/5
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800 mb-3 text-sm">
                          {item.question}
                        </h4>
                        <div className="space-y-2">
                          {item.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:text-blue-800 underline text-sm break-all hover:bg-blue-50 p-2 rounded transition-colors"
                            >
                              📎 {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          ) : (
            // Show certificate for good performance (rating >= 3.5)
            <div>
              <Image
                src="/badge.jpg"
                width={500}
                height={50}
                className="mt-7"
                alt="certificate"
              />
              <button
                onClick={handleDownload}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download Certificate
              </button>
            </div>
          )}

          {/* Tasks Section - Programming Course Recommendations */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                📚 Recommended Programming Courses
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Enhance your skills with these curated programming courses from top instructors
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmingCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                  onClick={() => openYouTubeVideo(course.videoId)}
                >
                  {/* Thumbnail */}
                  <div className="relative group">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-800'
                          : course.level === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : course.level === 'Advanced'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {course.level}
                      </span>
                      
                      <button 
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          openYouTubeVideo(course.videoId);
                        }}
                      >
                        <Play className="h-4 w-4" />
                        Watch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")} className="mt-8">
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;