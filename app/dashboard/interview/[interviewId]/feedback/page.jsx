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
import { ChevronsUpDown, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Feedback({ params: rawParams }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [overallRating, setOverallRating] = useState(0);
  const router = useRouter();

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
      const total = result.reduce((sum, item) => sum + parseInt(item.rating), 0);
      const average = Math.round((total / result.length) * 10) / 5;
      setOverallRating(average);
    }

    setFeedbackList(result);
  };

  // Function to extract links from suggestions
  const extractLinksFromSuggestions = () => {
    const linkRegex = /https?:\/\/[^\s\]]+/g;
    const suggestionsWithLinks = [];
    
    feedbackList.forEach((item, index) => {
      if (item.suggestion && item.suggestion.trim() !== '') {
        const links = item.suggestion.match(linkRegex);
        if (links && links.length > 0) {
          suggestionsWithLinks.push({
            question: item.question,
            links: links,
            rating: item.rating,
            index: index
          });
        }
      }
    });
    
    return suggestionsWithLinks;
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
                    <h2 className="p-2 border rounded-lg bg-purple-50 text-sm text-purple-900">
                      <strong>Suggestion:</strong> {item.suggestion}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

          {/* Conditional rendering based on overall rating */}
          {overallRating < 3.5 ? (
            // Show links section for good performance
            extractLinksFromSuggestions().length > 0 && (
              <Collapsible className="mt-7 mb-5">
                <CollapsibleTrigger className="p-4 flex justify-between bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg my-2 text-left gap-7 w-full hover:from-blue-100 hover:to-purple-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      🔗 Helpful Learning Resources ({extractLinksFromSuggestions().reduce((total, item) => total + item.links.length, 0)} links)
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
                      <div key={index} className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                            Question {index + 1}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            parseInt(item.rating) <= 3 ? 'bg-red-100 text-red-800' :
                            parseInt(item.rating) <= 6 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
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
            // Show certificate for poor performance (rating <= 3.5)
            <Image
              src="/certificate.jpeg"
              width={900}
              height={400}
              className="mt-7"
              alt="certificate"
            />
          )}
        </>
      )}
      
      <Button onClick={() => router.replace("/dashboard")} className="mt-6">
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;